/* eslint-disable @typescript-eslint/no-magic-numbers */

import { yup } from "utils/yup";

import { SectionTypeEnum } from "enums/section-type";

export const personalInformationSectionSchema = yup
	.object()
	.strict()
	.shape({
		type: yup
			.string()
			.strict()
			.required()
			.equals([SectionTypeEnum.PERSONAL_INFORMATION]),
		name: yup.string().strict().required(),
		headline: yup.string().strict().required(),
		aboutMe: yup.string().strict().required(),
		birthDate: yup.string().strict().required().isoDate(),
		email: yup.string().strict().required().email(),
		phone: yup.string().strict().required(),
		linkedin: yup
			.string()
			.strict()
			.notRequired()
			.url()
			.startsWith("https://linkedin.com/in/"),
		github: yup
			.string()
			.strict()
			.notRequired()
			.url()
			.startsWith("https://github.com/"),
	});
