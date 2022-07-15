/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */

import type { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { BatchGetItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

import type { LanguageEnum } from "enums/language";

interface Injectables {
	dynamo: DynamoDBClient;
}

export interface ServiceParams {
	userId: string;
	resumeId: string;
	templateId: string;
	language: LanguageEnum;
}

export const service = async (
	{ dynamo }: Injectables,
	{ userId, resumeId, templateId, language }: ServiceParams,
) => {
	const result = await dynamo.send(
		new BatchGetItemCommand({
			RequestItems: {
				"mvp-resumes": {
					Keys: [
						marshall({
							pk: `USER#${userId}`,
							sk: `RESUME#${resumeId}`,
						}),
					],
				},
				"templates": {
					Keys: [
						marshall({
							pk: "TEMPLATES",
							sk: `TEMPLATE#${templateId}`,
						}),
					],
				},
				"phrases-to-fill": {
					Keys: [
						marshall({
							pk: `TEMPLATE#${templateId}`,
							sk: `PHRASES_TO_FILL#LANGUAGE#${language}`,
						}),
					],
				},
				"months": {
					Keys: [
						marshall({
							pk: "MONTHS",
							sk: `LANGUAGE#${language}`,
						}),
					],
				},
			},
		}),
	);

	const resume = result.Responses?.["mvp-resumes"]?.shift();
	const template = result.Responses?.["templates"]?.shift();
	const phrasesToFill = result.Responses?.["phrases-to-fill"]?.shift();
	const months = result.Responses?.["months"]?.shift();

	if (!resume) {
		throw new Error("Resume not found");
	}

	if (!template) {
		throw new Error("Template not found");
	}

	if (!phrasesToFill || !months) {
		throw new Error("PhrasesToFill not found");
	}

	if (!months) {
		throw new Error("Months not found");
	}

	const { fontsUsed } = unmarshall(template);
	const { sections } = unmarshall(resume);

	if (!fontsUsed) {
		throw new Error("Template without 'fontsUsed'");
	}

	if (!sections) {
		throw new Error("Resume without 'sections'");
	}

	return {
		phrasesToFill: unmarshall(phrasesToFill),
		months: unmarshall(months),
		fontsUsed,
		sections,
	};
};
