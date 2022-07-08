import { isStrongPassword } from "@techmmunity/utils";
import { CustomError } from "utils/error";
import { makeValidate } from "utils/validate";
import { yup } from "utils/yup";

import type { ServiceParams } from "./service";

import { StatusCodeEnum } from "enums/status-code";

const schema = yup.object().strict().shape({
	companyId: yup.string().strict().required().uuid(),
	userId: yup.string().strict().required().uuid(),
	password: yup.string().strict().required(),
});

export const validate = async (p: ServiceParams) => {
	const initialValidate = makeValidate<ServiceParams>(schema);

	const result = await initialValidate(p);

	const { password } = result;

	if (!isStrongPassword(password)) {
		throw new CustomError("INVALID_PASSWORD", StatusCodeEnum.BAD_REQUEST);
	}

	return result;
};
