/* eslint-disable @typescript-eslint/naming-convention */

import { uid } from "uid/single";
import { dayjs } from "utils/date";

import type { PostgreDbClient } from "types/db";

interface GenRefreshTokenInput {
	userId: string;
	postgre: PostgreDbClient;
}

export const genRefreshToken = async ({
	userId,
	postgre,
}: GenRefreshTokenInput) => {
	const existentRefreshTokenRecord = await postgre.query(
		'SELECT * FROM refresh_tokens WHERE "userId" = $1;',
		[userId],
	);

	const existentRefreshToken = existentRefreshTokenRecord.rows.shift();

	if (existentRefreshToken) {
		return {
			refreshToken: existentRefreshToken.token,
		};
	}

	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	const token = uid(52);
	const createdAt = dayjs().toISOString();

	await postgre.query(
		'INSERT INTO refresh_tokens("userId", "token", "createdAt") VALUES ($1, $2, $3);',
		[userId, token, createdAt],
	);

	return {
		refreshToken: token,
	};
};
