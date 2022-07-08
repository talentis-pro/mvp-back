/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/naming-convention */

import type { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { BatchWriteItemCommand } from "@aws-sdk/client-dynamodb";
import type { SESClient } from "@aws-sdk/client-ses";
import { SendEmailCommand } from "@aws-sdk/client-ses";
import { marshall } from "@aws-sdk/util-dynamodb";
import { uid } from "uid/single";
import { encrypt } from "utils/bcrypt/encrypt";
import { dayjs } from "utils/date";
import { CustomError } from "utils/error";
import { v4 } from "uuid";

import { StatusCodeEnum } from "enums/status-code";
import { UserRoleEnum } from "enums/user-role";

interface Injectables {
	dynamo: DynamoDBClient;
	ses: SESClient;
}

export interface ServiceParams {
	businessName: string;
	businessNumber: string;
	type: string;
	email: string;
	phone: string;
	password: string;
}

export const service = async (
	{ dynamo, ses }: Injectables,
	{
		businessName,
		businessNumber,
		type,
		email,
		phone,
		password: rawPassword,
	}: ServiceParams,
) => {
	const companyId = v4();
	const userId = "owner"; // Hardcoded. The first user of the company always has the id as "owner"
	const createdAt = dayjs().toISOString();
	const verificationToken = uid(8);

	const password = encrypt(rawPassword);

	await dynamo
		.send(
			new BatchWriteItemCommand({
				RequestItems: {
					companies: [
						{
							pk: `COMPANY#${companyId}`,
							sk: "COMPANY",
							verified: false,
							createdAt,
							email,
							phone,
							businessName,
							businessNumber,
							type,
						},
						{
							pk: `COMPANY#${companyId}`,
							sk: `USER#${userId}`,
							createdAt,
							password,
							role: UserRoleEnum.OWNER,
						},
						{
							pk: `COMPANY#${companyId}`,
							sk: `VERIFICATION_TOKEN#${verificationToken}`,
						},
					].map(i => ({
						PutRequest: {
							Item: marshall(i),
						},
					})),
				},
			}),
		)
		.catch(err => {
			console.error("dynamodb error", err);

			throw new CustomError(
				"Fail to save customer on database",
				StatusCodeEnum.BAD_REQUEST,
			);
		});

	const verificationUrl = new URL(process.env.VERIFY_ACCOUNT_URL!);
	verificationUrl.searchParams.append("companyId", companyId);
	verificationUrl.searchParams.append("verificationToken", verificationToken);

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
						Data: `<html><body>Clique nesse link para confirmar sua conta: ${verificationUrl.href}</body></html>`,
					},
				},
			},
			Source: process.env.SOURCE_EMAIL_TO_SEND_EMAILS,
		}),
	);

	return {
		statusCode: StatusCodeEnum.NO_CONTENT,
	};
};
