/* eslint-disable @typescript-eslint/naming-convention */

import type { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { getDynamoInstance } from "config/dynamo";
import { uid } from "uid/single";

interface GenRefreshTokenInput {
	companyId: string;
	userId: string;
	dynamo?: DynamoDBClient;
}

export const genRefreshToken = async ({
	companyId,
	userId,
	dynamo: dynamodbInstance,
}: GenRefreshTokenInput) => {
	const dynamo = dynamodbInstance || getDynamoInstance();

	const existentRefreshTokenRecord = await dynamo.send(
		new QueryCommand({
			TableName: "companies",
			KeyConditionExpression: "pk = :pk AND begins_with(sk, :sk)",
			ExpressionAttributeValues: marshall({
				":pk": `COMPANY#${companyId}#USER#${userId}`,
				":sk": "REFRESH_TOKEN#",
			}),
		}),
	);

	const existentRefreshToken = existentRefreshTokenRecord.Items?.shift();

	if (existentRefreshToken) {
		const refreshToken = unmarshall(existentRefreshToken).sk.replace(
			"REFRESH_TOKEN#",
			"",
		);

		return {
			refreshToken,
		};
	}

	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	const token = uid(52);

	await dynamo.send(
		new PutItemCommand({
			TableName: "companies",
			Item: marshall({
				pk: `COMPANY#${companyId}#USER#${userId}`,
				sk: `REFRESH_TOKEN#${token}`,
			}),
		}),
	);

	return {
		refreshToken: token,
	};
};
