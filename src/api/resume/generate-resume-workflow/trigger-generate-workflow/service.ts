import type { SFNClient } from "@aws-sdk/client-sfn";
import { StartExecutionCommand } from "@aws-sdk/client-sfn";
import { v4 } from "uuid";

import type { LanguageEnum } from "enums/language";
import { StatusCodeEnum } from "enums/status-code";

interface Injectables {
	sfn: SFNClient;
}

export interface ServiceParams {
	resumeId: string;
	userId: string;
	templateId: string;
	language: LanguageEnum;
}

export const service = async (
	{ sfn }: Injectables,
	{ resumeId, userId, templateId, language }: ServiceParams,
) => {
	await sfn.send(
		new StartExecutionCommand({
			stateMachineArn: process.env.GENERATE_RESUME_WORKFLOW,
			input: JSON.stringify({
				resumeId,
				userId,
				templateId,
				language,
			}),
			name: v4(),
		}),
	);

	return {
		statusCode: StatusCodeEnum.NO_CONTENT,
	};
};
