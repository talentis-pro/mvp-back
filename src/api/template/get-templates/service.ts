/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/naming-convention */

import type { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { isEmptyArray } from "@techmmunity/utils";
import { CustomError } from "utils/error";

import { StatusCodeEnum } from "enums/status-code";
import { TemplateStatusEnum } from "enums/template-status";

interface Injectables {
	dynamo: DynamoDBClient;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ServiceParams {}

export const service = async ({ dynamo }: Injectables, _: ServiceParams) => {
	const records = await dynamo.send(
		new QueryCommand({
			TableName: "templates",
			KeyConditionExpression: "#pk = :pk",
			FilterExpression: "#status = :status",
			ExpressionAttributeNames: {
				"#pk": "pk",
				"#status": "status",
			},
			ExpressionAttributeValues: marshall({
				":pk": "TEMPLATES",
				":status": TemplateStatusEnum.AVAILABLE,
			}),
		}),
	);

	const templates = (records.Items || []).map(i => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { pk: _pk, sk: _sk, ...item } = unmarshall(i);

		return item;
	});

	if (isEmptyArray(templates)) {
		throw new CustomError("Not Found", StatusCodeEnum.NOT_FOUND);
	}

	return {
		statusCode: StatusCodeEnum.SUCCESS,
		body: JSON.stringify({
			templates,
		}),
	};
};
