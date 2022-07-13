/* eslint-disable @typescript-eslint/no-magic-numbers */

import { yup } from "utils/yup";

import { SectionTypeEnum } from "enums/section-type";

export const organizationSectionSchema = yup
	.object()
	.strict()
	.shape({
		type: yup
			.string()
			.strict()
			.required()
			.equals([SectionTypeEnum.ORGANIZATIONS]),
		items: yup
			.array()
			.strict()
			.required()
			.min(1)
			.of(
				yup.object().strict().required().shape({
					companyId: yup.string().strict().notRequired().uuid(),
					title: yup.string().strict().required(),
					description: yup.string().strict().notRequired(),
					url: yup.string().strict().notRequired().url(),
					role: yup.string().strict().required(),
					startDate: yup.string().strict().required().isoDate(),
					endDate: yup.string().strict().notRequired().isoDate(),
				}),
			),
	});
