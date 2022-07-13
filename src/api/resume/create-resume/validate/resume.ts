/* eslint-disable @typescript-eslint/no-magic-numbers */

import { getEnumValues } from "@techmmunity/utils";
import { yup } from "utils/yup";

import { LanguageEnum } from "enums/language";

export const resumeSchema = yup
	.object()
	.strict()
	.shape({
		userId: yup.string().strict().required().uuid(),
		templateId: yup.string().strict().required().uuid(),
		name: yup.string().strict().required(),
		language: yup
			.string()
			.strict()
			.required()
			.oneOf(getEnumValues(LanguageEnum)),
		sections: yup.array().strict().required().min(1),
	});
