import type { ValidationOptions, ValidationArguments } from "class-validator";
import { registerDecorator } from "class-validator";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const StartsWith = (
	startsWith: string,
	validationOptions?: ValidationOptions,
) => {
	return (object: Record<string, any>, propertyName: string) => {
		registerDecorator({
			name: "startsWith",
			target: object.constructor,
			propertyName,
			options: validationOptions,
			validator: {
				validate: (value: any, _args: ValidationArguments) =>
					value.startsWith(startsWith),
			},
		});
	};
};
