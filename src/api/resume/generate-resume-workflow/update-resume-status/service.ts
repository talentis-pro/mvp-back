/* eslint-disable @typescript-eslint/naming-convention */

import type { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

import type { ResumeStatusEnum } from "enums/resume-status";

interface Injectables {
	dynamo: DynamoDBClient;
}

export interface ServiceParams {
	userId: string;
	resumeId: string;
	updateResumeStatusTo: ResumeStatusEnum;
}

export const service = async (
	{ dynamo }: Injectables,
	{ userId, resumeId, updateResumeStatusTo }: ServiceParams,
) => {
	await dynamo.send(
		new UpdateItemCommand({
			TableName: "mvp-resumes",
			Key: marshall({
				pk: `USER#${userId}`,
				sk: `RESUME#${resumeId}`,
			}),
			UpdateExpression: "SET #status=:status",
			ExpressionAttributeNames: {
				"#status": "status",
			},
			ExpressionAttributeValues: marshall({
				":status": updateResumeStatusTo,
			}),
		}),
	);
};
