/* eslint-disable @typescript-eslint/no-magic-numbers */

import { getEnumValues } from "@techmmunity/utils";
import { yup } from "utils/yup";

import { CountryEnum } from "enums/country";
import { SectionTypeEnum } from "enums/section-type";

export const locationSectionSchema = yup
	.object()
	.strict()
	.shape({
		type: yup.string().strict().required().equals([SectionTypeEnum.LOCATION]),
		line1: yup.string().strict().notRequired(),
		line2: yup.string().strict().notRequired(),
		postalCode: yup.string().strict().notRequired(),
		city: yup.string().strict().notRequired(),
		state: yup.string().strict().required(),
		country: yup.string().strict().required().oneOf(getEnumValues(CountryEnum)),
	});
