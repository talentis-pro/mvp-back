/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/naming-convention */

import type { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

import { StatusCodeEnum } from "enums/status-code";

interface Injectables {
	dynamo: DynamoDBClient;
}

export interface ServiceParams {
	userId: string;
	resumeId: string;
}

export const service = async (
	{ dynamo }: Injectables,
	{ userId, resumeId }: ServiceParams,
) => {
	await dynamo.send(
		new DeleteItemCommand({
			TableName: "mvp-resumes",
			Key: marshall({
				pk: `USER#${userId}`,
				sk: `RESUME#${resumeId}`,
			}),
		}),
	);

	return {
		statusCode: StatusCodeEnum.NO_CONTENT,
	};
};
