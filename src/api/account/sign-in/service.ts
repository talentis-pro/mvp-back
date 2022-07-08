/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/naming-convention */

import type { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { BatchGetItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import type { GenAllTokensType } from "utils/auth-tokens/gen-all-tokens";
import { compare } from "utils/bcrypt/compare";
import { CustomError } from "utils/error";

import { StatusCodeEnum } from "enums/status-code";

interface Injectables {
	dynamo: DynamoDBClient;
	genAllTokens: GenAllTokensType;
}

export interface ServiceParams {
	companyId: string;
	userId: string;
	password: string;
}

export const service = async (
	{ dynamo, genAllTokens }: Injectables,
	{ companyId, userId, password: rawPassword }: ServiceParams,
) => {
	const records = await dynamo.send(
		new BatchGetItemCommand({
			RequestItems: {
				companies: {
					Keys: [
						{
							pk: `COMPANY#${companyId}`,
							sk: "COMPANY",
						},
						{
							pk: `COMPANY#${companyId}`,
							sk: `USER#${userId}`,
						},
					].map(i => marshall(i)),
				},
			},
		}),
	);

	const items = records.Responses?.companies.map(i => unmarshall(i));

	if (!items) {
		throw new CustomError("NOT_FOUND", StatusCodeEnum.NOT_FOUND);
	}

	const company = items.find(r => r.sk === "COMPANY");
	const user = items.find(r => r.sk === `USER#${userId}`);

	if (!company || !user) {
		throw new CustomError("NOT_FOUND", StatusCodeEnum.NOT_FOUND);
	}

	const { verified } = company;

	if (!verified) {
		throw new CustomError("COMPANY_UNVERIFIED", StatusCodeEnum.UNAUTHORIZED);
	}

	const { password, role } = user;

	const isValidPassword = await compare(rawPassword, password);

	if (!isValidPassword) {
		throw new CustomError("INVALID_PASSWORD", StatusCodeEnum.BAD_REQUEST);
	}

	const { accessToken, refreshToken, expirationDate } = await genAllTokens({
		companyId,
		userId,
		dynamo,
		role,
	});

	return {
		statusCode: StatusCodeEnum.SUCCESS,
		body: JSON.stringify({
			accessToken,
			refreshToken,
			expirationDate,
			role,
		}),
	};
};
