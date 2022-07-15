/* eslint-disable capitalized-comments */
/* eslint-disable multiline-comment-style */
/**
 * This file cannot use absolute paths!
 */
import { getHandlerPath } from "../../../../helpers/get-handler-path";
import { makeHandler } from "../../../../helpers/make-handler";

export const triggerGenerateWorkflow = makeHandler({
	handler: `${getHandlerPath(__dirname)}/controller.controller`,
	events: [
		{
			sqs: {
				arn: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					"Fn::GetAtt": ["GenerateResumeQueue", "Arn"],
				},
			},
		},
	],
});
