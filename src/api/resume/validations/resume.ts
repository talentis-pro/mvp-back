/* eslint-disable @typescript-eslint/no-magic-numbers */

import { getEnumValues } from "@techmmunity/utils";
import { yup } from "utils/yup";

import { LanguageEnum } from "enums/language";

export const resumeId = yup.string().strict().uuid();

export const userId = yup.string().strict().uuid();

export const templateId = yup.string().strict().uuid();

export const name = yup.string().strict();

export const language = yup
	.string()
	.strict()
	.oneOf(getEnumValues(LanguageEnum));

export const sections = yup.array().strict().min(1);
