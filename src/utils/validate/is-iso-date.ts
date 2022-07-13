import { isIsoDate } from "@techmmunity/utils";
import type { ValidationOptions, ValidationArguments } from "class-validator";
import { registerDecorator } from "class-validator";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const IsIsoDate = (validationOptions?: ValidationOptions) => {
	return (object: Record<string, any>, propertyName: string) => {
		registerDecorator({
			name: "isIsoDate",
			target: object.constructor,
			propertyName,
			options: validationOptions,
			validator: {
				validate: (value: any, _args: ValidationArguments) => isIsoDate(value),
			},
		});
	};
};
