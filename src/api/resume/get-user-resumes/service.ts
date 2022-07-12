/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/naming-convention */

import type { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { isEmptyArray } from "@techmmunity/utils";
import { MAXIMUM_USER_RESUMES } from "config/business-rules";
import { CustomError } from "utils/error";

import { StatusCodeEnum } from "enums/status-code";

interface Injectables {
	dynamo: DynamoDBClient;
}

export interface ServiceParams {
	userId: string;
}

export const service = async (
	{ dynamo }: Injectables,
	{ userId }: ServiceParams,
) => {
	const resumesRecords = await dynamo.send(
		new QueryCommand({
			TableName: "mvp-resumes",
			KeyConditionExpression: "pk = :pk",
			ExpressionAttributeValues: marshall({
				":pk": `USER#${userId}`,
			}),
		}),
	);

	const items = (resumesRecords.Items || [])
		.map(i => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { pk: _pk, sk: _sk, ...item } = unmarshall(i);

			return item;
		})
		.sort((a, b) => a.updatedAt - b.updatedAt);

	if (isEmptyArray(items)) {
		throw new CustomError("NOT_FOUND", StatusCodeEnum.NOT_FOUND);
	}

	const remainingResumes = MAXIMUM_USER_RESUMES - items.length;

	return {
		statusCode: StatusCodeEnum.SUCCESS,
		body: JSON.stringify({
			data: items,
			remainingResumes,
			canCreateMoreResumes: remainingResumes > 0,
		}),
	};
};
