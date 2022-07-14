/* eslint-disable @typescript-eslint/no-magic-numbers */

import { getEnumValues } from "@techmmunity/utils";
import { yup } from "utils/yup";

import { DegreeEnum } from "enums/degree";
import { SectionTypeEnum } from "enums/section-type";

export const educationSectionSchema = yup
	.object()
	.strict()
	.shape({
		type: yup.string().strict().required().equals([SectionTypeEnum.EDUCATIONS]),
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
						schoolName: yup.string().strict().required(),
						degree: yup
							.string()
							.strict()
							.required()
							.oneOf(getEnumValues(DegreeEnum)),
						fieldOfStudy: yup.string().strict().required(),
						description: yup.string().strict().notRequired(),
						startDate: yup.string().strict().required().isoDate(),
						endDate: yup.string().strict().required().isoDate(),
					}),
			),
	});
