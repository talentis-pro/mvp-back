/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/naming-convention */

import type { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
	PutItemCommand,
	GetItemCommand,
	DeleteItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import type { StripeClient } from "config/stripe";
import { CustomError } from "utils/error";

import { StatusCodeEnum } from "enums/status-code";

interface Injectables {
	dynamo: DynamoDBClient;
	stripe: StripeClient;
}

export interface ServiceParams {
	companyId: string;
	verificationToken: string;
}

export const service = async (
	{ dynamo, stripe }: Injectables,
	{ companyId, verificationToken }: ServiceParams,
) => {
	const verificationTokenRecord = await dynamo.send(
		new GetItemCommand({
			TableName: "companies",
			Key: marshall({
				pk: `COMPANY#${companyId}`,
				sk: `VERIFICATION_TOKEN#${verificationToken}`,
			}),
		}),
	);

	if (!verificationTokenRecord.Item) {
		throw new CustomError(
			"VERIFICATION_TOKEN_NOT_FOUND",
			StatusCodeEnum.NOT_FOUND,
		);
	}

	const companyRecord = await dynamo.send(
		new GetItemCommand({
			TableName: "companies",
			Key: marshall({
				pk: `COMPANY#${companyId}`,
				sk: "COMPANY",
			}),
		}),
	);

	const company = unmarshall(companyRecord.Item!);

	const stripeResponse = await stripe.customers
		.create({
			name: company.businessName,
			email: company.email,
		})
		.catch(err => {
			console.error("stripe error", err);

			throw new CustomError(
				"Fail to create Stripe customer",
				StatusCodeEnum.BAD_REQUEST,
			);
		});

	await dynamo
		.send(
			new PutItemCommand({
				TableName: "companies",
				Item: marshall({
					pk: `COMPANY#${companyId}`,
					sk: "COMPANY",
					stripeCustomerId: stripeResponse.id,
					verified: true,
				}),
			}),
		)
		.catch(err => {
			console.error("dynamodb error", err);

			throw new CustomError(
				"Fail to save customer on database",
				StatusCodeEnum.BAD_REQUEST,
			);
		});

	await dynamo.send(
		new DeleteItemCommand({
			TableName: "companies",
			Key: marshall({
				pk: `COMPANY#${companyId}`,
				sk: `VERIFICATION_TOKEN#${verificationToken}`,
			}),
		}),
	);

	return {
		statusCode: StatusCodeEnum.NO_CONTENT,
	};
};
