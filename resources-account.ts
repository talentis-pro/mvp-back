/* eslint-disable camelcase */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/naming-convention */

import type { AWS } from "@serverless/typescript";

export const resourcesAccount: AWS["resources"] = {
	Resources: {
		CompaniesDynamoDBTable: {
			DeletionPolicy: "Retain",
			UpdateReplacePolicy: "Retain",
			Type: "AWS::DynamoDB::Table",
			Properties: {
				BillingMode: "PAY_PER_REQUEST",
				AttributeDefinitions: [
					{
						AttributeName: "pk",
						AttributeType: "S",
					},
					{
						AttributeName: "sk",
						AttributeType: "S",
					},
				],
				KeySchema: [
					{
						AttributeName: "pk",
						KeyType: "HASH",
					},
					{
						AttributeName: "sk",
						KeyType: "RANGE",
					},
				],
				TableName: "companies",
			},
		},
	},
};
