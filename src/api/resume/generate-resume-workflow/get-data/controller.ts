import { getDynamoInstance } from "config/dynamo";
import { makeGenerateResumeController } from "helpers/make-generate-resume-controller";

import { service } from "./service";

export const controller = makeGenerateResumeController(({ event }) => {
	return service(
		{
			dynamo: getDynamoInstance(),
		},
		{
			userId: event.userId,
			resumeId: event.resumeId,
			templateId: event.templateId,
			language: event.language,
		},
	);
});
