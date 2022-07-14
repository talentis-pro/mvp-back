/* eslint-disable @typescript-eslint/no-magic-numbers */

import { yup } from "utils/yup";

import { SectionTypeEnum } from "enums/section-type";

export const languagesSectionSchema = yup
	.object()
	.strict()
	.shape({
		type: yup.string().strict().required().equals([SectionTypeEnum.LANGUAGES]),
		items: yup
			.array()
			.strict()
			.required()
			.min(1)
			.of(yup.string().strict().required()),
	});
