/* eslint-disable @typescript-eslint/naming-convention */

import type { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import type { SQSClient } from "@aws-sdk/client-sqs";
import { SendMessageCommand } from "@aws-sdk/client-sqs";
import { marshall } from "@aws-sdk/util-dynamodb";
import { MAXIMUM_USER_RESUMES } from "config/business-rules";
import { date } from "utils/date";
import { CustomError } from "utils/error";
import { v4 } from "uuid";

import type { LanguageEnum } from "enums/language";
import { ResumeStatusEnum } from "enums/resume-status";
import { StatusCodeEnum } from "enums/status-code";
import type { Sections } from "types/resume/sections";

interface Injectables {
	dynamo: DynamoDBClient;
	sqs: SQSClient;
}

export interface ServiceParams {
	userId: string;
	templateId: string;
	name: string;
	language: LanguageEnum;
	sections: Sections;
}

export const service = async (
	{ dynamo, sqs }: Injectables,
	{ userId, templateId, name, language, sections }: ServiceParams,
) => {
	const userResumes = await dynamo.send(
		new QueryCommand({
			TableName: "mvp-resumes",
			KeyConditionExpression: "#pk = :pk AND begins_with(#sk, :sk)",
			ExpressionAttributeNames: {
				"#pk": "pk",
				"#sk": "sk",
			},
			ExpressionAttributeValues: marshall({
				":pk": `USER#${userId}`,
				":sk": "RESUME#",
			}),
		}),
	);

	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	if ((userResumes.Count || 0) >= MAXIMUM_USER_RESUMES) {
		throw new CustomError("Maximum resumes reached", StatusCodeEnum.CONFLICT);
	}

	const resumeId = v4();

	await dynamo.send(
		new PutItemCommand({
			TableName: "mvp-resumes",
			Item: marshall({
				pk: `USER#${userId}`,
				sk: `RESUME#${resumeId}`,
				resumeId,
				userId,
				templateId,
				name,
				language,
				sections,
				status: ResumeStatusEnum.PROCESSING,
				createdAt: date().toISOString(),
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
				templateId,
				language,
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
