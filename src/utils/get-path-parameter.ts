import type { APIGatewayProxyEventPathParameters } from "aws-lambda";
import { StatusCodeEnum } from "enums/status-code";

import { CustomError } from "./error";

export const getPathParameter = (
	pathParameter: APIGatewayProxyEventPathParameters | null,
) => {
	if (pathParameter) {
		return {
			...pathParameter,
		};
	}

	throw new CustomError(
		"you must provide the path parameter",
		StatusCodeEnum.BAD_REQUEST,
	);
};
