import { StatusCodeEnum } from "enums/status-code";
import type { ObjectSchema } from "yup";

import { CustomError } from "./error";

export const makeValidate =
	<ServiceParams>(schema: ObjectSchema<any>) =>
	(params: ServiceParams) =>
		schema.validate(params).catch(err => {
			throw new CustomError(err.errors.join(";"), StatusCodeEnum.BAD_REQUEST);
		}) as Promise<ServiceParams>;
