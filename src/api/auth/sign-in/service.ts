/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/naming-convention */

import type { GenAllTokensType } from "utils/auth-tokens/gen-all-tokens";
import { compare } from "utils/bcrypt/compare";
import { CustomError } from "utils/error";

import { StatusCodeEnum } from "enums/status-code";
import type { PostgreDbClient } from "types/db";

interface Injectables {
	postgre: PostgreDbClient;
	genAllTokens: GenAllTokensType;
}

export interface ServiceParams {
	email: string;
	password: string;
}

export const service = async (
	{ postgre, genAllTokens }: Injectables,
	{ email, password: rawPassword }: ServiceParams,
) => {
	const records = await postgre.query(
		'SELECT * FROM users WHERE "email" = $1 LIMIT 1;',
		[email],
	);

	const user = records.rows.shift();

	if (!user) {
		throw new CustomError("Forbidden", StatusCodeEnum.FORBIDDEN);
	}

	const { id: userId, password, verified } = user;

	const isValidPassword = await compare(rawPassword, password);

	if (!isValidPassword) {
		throw new CustomError("Forbidden", StatusCodeEnum.FORBIDDEN);
	}

	if (!verified) {
		throw new CustomError("Unverified", StatusCodeEnum.UNAUTHORIZED);
	}

	const { accessToken, refreshToken, expirationDate } = await genAllTokens({
		userId,
		postgre,
	});

	return {
		statusCode: StatusCodeEnum.SUCCESS,
		body: JSON.stringify({
			accessToken,
			refreshToken,
			expirationDate,
		}),
	};
};
