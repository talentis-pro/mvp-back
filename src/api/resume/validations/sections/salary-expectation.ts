/* eslint-disable @typescript-eslint/no-magic-numbers */

import { getEnumValues } from "@techmmunity/utils";
import { yup } from "utils/yup";

import { CurrencyEnum } from "enums/currency";
import { EmploymentTypeEnum } from "enums/employment-type";
import { SectionTypeEnum } from "enums/section-type";
import { WageTimeRangeEnum } from "enums/wage-time-range";

export const salaryExpectationSectionSchema = yup
	.object()
	.strict()
	.shape({
		type: yup
			.string()
			.strict()
			.required()
			.equals([SectionTypeEnum.SALARY_EXPECTATION]),
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
						position: yup.string().strict().notRequired(),
						employmentType: yup
							.string()
							.strict()
							.notRequired()
							.oneOf(getEnumValues(EmploymentTypeEnum)),
						value: yup.number().strict().required().positive(),
						currency: yup
							.string()
							.strict()
							.required()
							.oneOf(getEnumValues(CurrencyEnum)),
						wageTimeRange: yup
							.string()
							.strict()
							.required()
							.oneOf(getEnumValues(WageTimeRangeEnum)),
					}),
			),
	});
