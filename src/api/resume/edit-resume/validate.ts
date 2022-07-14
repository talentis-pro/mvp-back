/* eslint-disable @typescript-eslint/no-magic-numbers */

import { isEmptyArray } from "@techmmunity/utils";
import { CustomError } from "utils/error";
import { makeValidate } from "utils/validate";
import { yup } from "utils/yup";

import {
	language,
	name,
	resumeId,
	sections,
	templateId,
	userId,
} from "../validations/resume";
import { validateSectionsArray } from "../validations/sections";

import type { ServiceParams } from "./service";

import { StatusCodeEnum } from "enums/status-code";

export const resumeSchema = yup.object().strict().shape({
	resumeId: resumeId.required(),
	userId: userId.required(),
	templateId: templateId.notRequired(),
	name: name.notRequired(),
	language: language.notRequired(),
	sections: sections.notRequired(),
});

export const validate = async (params: ServiceParams) => {
	const initialValidate = makeValidate<ServiceParams>(resumeSchema);

	const result = await initialValidate(params);

	const {
		templateId: templateIdValue,
		name: nameValue,
		language: languageValue,
		sections: sectionsValue,
	} = result;

	if (
		!templateIdValue &&
		!nameValue &&
		!languageValue &&
		(!sectionsValue || isEmptyArray(sectionsValue))
	) {
		throw new CustomError(
			"You must update at least one field!",
			StatusCodeEnum.BAD_REQUEST,
		);
	}

	if (sectionsValue) {
		const validatedSections = validateSectionsArray(sectionsValue);

		return {
			...result,
			sections: validatedSections,
		};
	}

	return result;
};
