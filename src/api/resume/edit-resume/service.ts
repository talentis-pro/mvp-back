/* eslint-disable @typescript-eslint/naming-convention */

import type { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetItemCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import type { SQSClient } from "@aws-sdk/client-sqs";
import { SendMessageCommand } from "@aws-sdk/client-sqs";
import { marshall } from "@aws-sdk/util-dynamodb";
import { date } from "utils/date";
import { CustomError } from "utils/error";

import type { LanguageEnum } from "enums/language";
import { StatusCodeEnum } from "enums/status-code";

interface Injectables {
	dynamo: DynamoDBClient;
	sqs: SQSClient;
}

export interface ServiceParams {
	resumeId: string;
	userId: string;
	templateId?: string;
	name?: string;
	language?: LanguageEnum;
	sections?: Array<any>;
}

export const service = async (
	{ dynamo, sqs }: Injectables,
	{ resumeId, userId, templateId, name, language, sections }: ServiceParams,
) => {
	const resume = await dynamo.send(
		new GetItemCommand({
			TableName: "mvp-resumes",
			Key: marshall({
				pk: `USER#${userId}`,
				sk: `RESUME#${resumeId}`,
			}),
		}),
	);

	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	if (!resume.Item) {
		throw new CustomError("Resume not found", StatusCodeEnum.NOT_FOUND);
	}

	await dynamo.send(
		new UpdateItemCommand({
			TableName: "mvp-resumes",
			UpdateExpression: [
				"SET",
				[
					"#templateId=:templateId",
					"#name=:name",
					"#language=:language",
					"#sections=:sections",
					"#updatedAt=:updatedAt",
				].join(", "),
				"ADD",
				["#version=:version"].join(", "),
			].join(" "),
			Key: marshall({
				pk: `USER#${userId}`,
				sk: `RESUME#${resumeId}`,
			}),
			ExpressionAttributeNames: {
				"#templateId": "templateId",
				"#name": "name",
				"#language": "language",
				"#sections": "sections",
				"#updatedAt": "updatedAt",
			},
			ExpressionAttributeValues: marshall({
				templateId,
				name,
				language,
				sections,
				version: 1,
				updatedAt: date().toISOString(),
			}),
		}),
	);

	await sqs.send(
		new SendMessageCommand({
			QueueUrl: process.env.GENERATE_RESUME_QUEUE_URL,
			MessageBody: JSON.stringify({
				resumeId,
				userId,
			}),
		}),
	);

	return {
		statusCode: StatusCodeEnum.CREATED,
		body: JSON.stringify({
			resumeId,
		}),
	};
};
