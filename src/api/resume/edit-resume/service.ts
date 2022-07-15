/* eslint-disable @typescript-eslint/naming-convention */

import type { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetItemCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import type { SQSClient } from "@aws-sdk/client-sqs";
import { SendMessageCommand } from "@aws-sdk/client-sqs";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { date } from "utils/date";
import { CustomError } from "utils/error";

import type { LanguageEnum } from "enums/language";
import { ResumeStatusEnum } from "enums/resume-status";
import { StatusCodeEnum } from "enums/status-code";
import type { Sections } from "types/resume/sections";

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
	sections?: Sections;
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

	const {
		templateId: templateIdValue,
		language: languageValue,
		status: statusValue,
	} = unmarshall(resume.Item);

	if (statusValue === ResumeStatusEnum.PROCESSING) {
		throw new CustomError(
			"Resume already being processed",
			StatusCodeEnum.CONFLICT,
		);
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
					"#status=:status",
					"#updatedAt=:updatedAt",
				].join(", "),
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
				"#status": "status",
				"#updatedAt": "updatedAt",
			},
			ExpressionAttributeValues: marshall({
				templateId,
				name,
				language,
				sections,
				status: ResumeStatusEnum.PROCESSING,
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
				templateId: templateId || templateIdValue,
				language: language || languageValue,
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
