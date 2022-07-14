/* eslint-disable @typescript-eslint/naming-convention */

import type { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { date } from "utils/date";

import { StatusCodeEnum } from "enums/status-code";

interface Injectables {
	dynamo: DynamoDBClient;
}

export interface ServiceParams {
	userId: string;
	resumeId: string;
	name: string;
}

export const service = async (
	{ dynamo }: Injectables,
	{ userId, resumeId, name }: ServiceParams,
) => {
	await dynamo.send(
		new PutItemCommand({
			TableName: "mvp-resumes",
			Item: marshall({
				pk: `USER#${userId}`,
				sk: `RESUME#${resumeId}`,
				name,
				updatedAt: date().toISOString(),
			}),
		}),
	);

	return {
		statusCode: StatusCodeEnum.NO_CONTENT,
	};
};
