/* eslint-disable @typescript-eslint/no-magic-numbers */

import { yup } from "utils/yup";

import { SectionTypeEnum } from "enums/section-type";

export const openSourceSectionSchema = yup
	.object()
	.strict()
	.shape({
		type: yup
			.string()
			.strict()
			.required()
			.equals([SectionTypeEnum.OPEN_SOURCES]),
		items: yup
			.array()
			.strict()
			.required()
			.min(1)
			.of(
				yup.object().strict().required().shape({
					title: yup.string().strict().required(),
					description: yup.string().strict().notRequired(),
					url: yup.string().strict().notRequired().url(),
				}),
			),
	});
