/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/naming-convention */

import type { AWS } from "@serverless/typescript";

export const resourcesResume: AWS["resources"] = {
	Resources: {
		GenerateResumeQueue: {
			Type: "AWS::SQS::Queue",
			Properties: {
				QueueName: "${self:service}-${opt:stage, 'dev'}-generate-resume",
			},
		},
	},
};
