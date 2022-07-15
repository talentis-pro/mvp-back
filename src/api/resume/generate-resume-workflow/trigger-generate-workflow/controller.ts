import type { SQSEvent } from "aws-lambda";
import { getSfnInstance } from "config/sfn";
import { makeGenerateResumeController } from "helpers/make-generate-resume-controller";

import { service } from "./service";

export const controller = makeGenerateResumeController<SQSEvent>(
	({ event }) => {
		// eslint-disable-next-line @typescript-eslint/no-magic-numbers
		const params = JSON.parse(event.Records[0].body || "{}");

		return service(
			{
				sfn: getSfnInstance(),
			},
			params,
		);
	},
);
