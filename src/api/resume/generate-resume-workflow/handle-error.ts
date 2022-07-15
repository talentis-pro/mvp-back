/* eslint-disable @typescript-eslint/naming-convention */
import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda";

import { ResumeStatusEnum } from "enums/resume-status";

export const errorHandler = async (event: any, error: any) => {
	const lambda = new LambdaClient({
		region: process.env.AWS_REGION,
	});

	try {
		const params = new InvokeCommand({
			FunctionName: process.env.UPDATE_RESUME_STATUS_LAMBDA_ARN,
			Payload: Buffer.from(
				JSON.stringify({
					updateResumeStatusTo: ResumeStatusEnum.ERROR,
					event,
					function: process.env.AWS_LAMBDA_FUNCTION_NAME,
					error: error?.toString(),
				}),
			),
		});

		await lambda.send(params);
	} catch (err: any) {
		console.error(err.message);

		throw err;
	}

	return "success";
};
