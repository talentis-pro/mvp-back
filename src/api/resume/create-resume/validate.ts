/* eslint-disable @typescript-eslint/no-magic-numbers */

import { makeValidate } from "utils/validate";
import { yup } from "utils/yup";

import {
	language,
	name,
	sections,
	templateId,
	userId,
} from "../validations/resume";
import { validateSectionsArray } from "../validations/sections";

import type { ServiceParams } from "./service";

export const resumeSchema = yup.object().strict().shape({
	userId: userId.required(),
	templateId: templateId.required(),
	name: name.required(),
	language: language.required(),
	sections: sections.required(),
});

export const validate = async (params: ServiceParams) => {
	const initialValidate = makeValidate<ServiceParams>(resumeSchema);

	const result = await initialValidate(params);

	const { sections: rawSections } = result;

	const validatedSections = validateSectionsArray(rawSections);

	return {
		...result,
		sections: validatedSections,
	};
};
