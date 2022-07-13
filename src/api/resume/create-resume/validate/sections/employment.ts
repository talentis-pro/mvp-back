/* eslint-disable @typescript-eslint/no-magic-numbers */

import { yup } from "utils/yup";

import { SectionTypeEnum } from "enums/section-type";

export const employmentSectionSchema = yup
	.object()
	.strict()
	.shape({
		type: yup
			.string()
			.strict()
			.required()
			.equals([SectionTypeEnum.EMPLOYMENTS]),
		items: yup
			.array()
			.strict()
			.required()
			.min(1)
			.of(
				yup
					.object()
					.strict()
					.required()
					.shape({
						visible: yup.bool().strict().required(),
						companyId: yup.string().strict().notRequired().uuid(),
						companyName: yup.string().strict().required(),
						description: yup.string().strict().notRequired(),
						location: yup.string().strict().notRequired(),
						role: yup.string().strict().required(),
						startDate: yup.string().strict().required().isoDate(),
						endDate: yup.string().strict().notRequired().isoDate(),
						inChargeOf: yup
							.array()
							.strict()
							.notRequired()
							.min(1)
							.of(yup.string().strict().required()),
						skills: yup
							.array()
							.strict()
							.notRequired()
							.min(1)
							.of(yup.string().strict().required()),
					}),
			),
	});
