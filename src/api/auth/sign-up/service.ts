/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/naming-convention */

import type { SESClient } from "@aws-sdk/client-ses";
import { SendEmailCommand } from "@aws-sdk/client-ses";
import { uid } from "uid/single";
import { encrypt } from "utils/bcrypt/encrypt";
import { date } from "utils/date";
import { CustomError } from "utils/error";
import { v4 } from "uuid";

import { StatusCodeEnum } from "enums/status-code";
import type { PostgreDbClient } from "types/db";

interface Injectables {
	postgre: PostgreDbClient;
	ses: SESClient;
}

export interface ServiceParams {
	email: string;
	password: string;
}

export const service = async (
	{ postgre, ses }: Injectables,
	{ email, password: rawPassword }: ServiceParams,
) => {
	const userId = v4();
	const createdAt = date().toISOString();

	const password = encrypt(rawPassword);

	await postgre
		.query(
			'INSERT INTO users("id", "email", "password", "verified", "createdAt") VALUES ($1, $2, $3, $4, $5);',
			[userId, email, password, false, createdAt],
		)
		.catch(err => {
			console.error("dynamodb error", err);

			throw new CustomError(
				"Fail to save user on database",
				StatusCodeEnum.BAD_REQUEST,
			);
		});

	const verificationToken = uid(8);

	await postgre
		.query(
			'INSERT INTO verification_tokens("token", "userId", "createdAt") VALUES ($1, $2, $3);',
			[verificationToken, userId, createdAt],
		)
		.catch(err => {
			console.error("dynamodb error", err);

			throw new CustomError(
				"Fail to save verification token on database",
				StatusCodeEnum.BAD_REQUEST,
			);
		});

	await ses.send(
		new SendEmailCommand({
			Destination: {
				ToAddresses: [email],
			},
			Message: {
				Subject: {
					Charset: "UTF-8",
					Data: "Verifique sua conta!",
				},
				Body: {
					Html: {
						Charset: "UTF-8",
						Data: `<html><body>Seu código é: ${verificationToken}</body></html>`,
					},
				},
			},
			Source: process.env.SOURCE_EMAIL_TO_SEND_EMAILS,
		}),
	);

	return {
		statusCode: StatusCodeEnum.CREATED,
		body: JSON.stringify({
			userId,
		}),
	};
};
