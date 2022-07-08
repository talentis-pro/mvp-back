/* eslint-disable @typescript-eslint/no-magic-numbers */

import { getEnumValues, isCnpj, isStrongPassword } from "@techmmunity/utils";
import { CustomError } from "utils/error";
import { makeValidate } from "utils/validate";
import { yup } from "utils/yup";

import type { ServiceParams } from "./service";

import { CompanyTypeEnum } from "enums/company-type";
import { StatusCodeEnum } from "enums/status-code";

const schema = yup
	.object()
	.strict()
	.shape({
		businessName: yup.string().strict().required().max(350),
		businessNumber: yup.string().strict().required().max(100),
		type: yup
			.string()
			.strict()
			.required()
			.oneOf(getEnumValues(CompanyTypeEnum)),
		email: yup.string().strict().required().email(),
		phone: yup.string().strict().required(),
		password: yup.string().strict().required(),
	});

export const validate = async (p: ServiceParams) => {
	const initialValidate = makeValidate<ServiceParams>(schema);

	const result = await initialValidate(p);

	const { phone, businessNumber, password } = result;

	if (!phone.startsWith("+")) {
		throw new CustomError("INVALID_PASSWORD", StatusCodeEnum.BAD_REQUEST);
	}

	if (!isCnpj(businessNumber)) {
		throw new CustomError(
			"INVALID_BUSINESS_NUMBER",
			StatusCodeEnum.BAD_REQUEST,
		);
	}

	if (!isStrongPassword(password)) {
		throw new CustomError("INVALID_PASSWORD", StatusCodeEnum.BAD_REQUEST);
	}

	return result;
};
