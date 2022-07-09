/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/naming-convention */

import { CustomError } from "utils/error";

import { StatusCodeEnum } from "enums/status-code";
import type { PostgreDbClient } from "types/db";

interface Injectables {
	postgre: PostgreDbClient;
}

export interface ServiceParams {
	userId: string;
	verificationToken: string;
}

export const service = async (
	{ postgre }: Injectables,
	{ userId, verificationToken }: ServiceParams,
) => {
	const verificationTokenRecord = await postgre.query(
		'SELECT * FROM verification_tokens WHERE "userId" = $1 AND "token" = $2;',
		[userId, verificationToken],
	);

	const verificationTokenExists = verificationTokenRecord.rows.shift();

	if (!verificationTokenExists) {
		throw new CustomError("NOT_FOUND", StatusCodeEnum.NOT_FOUND);
	}

	await postgre.query('UPDATE users SET "verified" = $1 WHERE "userId" = $2;', [
		true,
		userId,
	]);

	await postgre.query(
		'DELETE FROM verification_tokens WHERE "userId" = $1 AND "token" = $2;',
		[userId, verificationToken],
	);

	return {
		statusCode: StatusCodeEnum.NO_CONTENT,
	};
};
