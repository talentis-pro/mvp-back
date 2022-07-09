/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/naming-convention */

import { genAccessToken } from "utils/auth-tokens/gen-access-token";
import { CustomError } from "utils/error";

import { StatusCodeEnum } from "enums/status-code";
import type { PostgreDbClient } from "types/db";

interface Injectables {
	postgre: PostgreDbClient;
}

export interface ServiceParams {
	userId: string;
	refreshToken: string;
}

export const service = async (
	{ postgre }: Injectables,
	{ userId, refreshToken }: ServiceParams,
) => {
	const refreshTokenRecord = await postgre.query(
		'SELECT * FROM refresh_tokens WHERE "userId" = $1 AND "token" = $2;',
		[userId, refreshToken],
	);

	const refreshTokenExists = refreshTokenRecord.rows.shift();

	if (!refreshTokenExists) {
		throw new CustomError("NOT_FOUND", StatusCodeEnum.NOT_FOUND);
	}

	const accessTokenData = await genAccessToken({ userId });

	return {
		statusCode: StatusCodeEnum.NO_CONTENT,
		body: JSON.stringify(accessTokenData),
	};
};
