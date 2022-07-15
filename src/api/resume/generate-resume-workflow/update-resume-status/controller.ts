import { getDynamoInstance } from "config/dynamo";
import { makeGenerateResumeController } from "helpers/make-vod-controller";

import { service } from "./service";

export const controller = makeGenerateResumeController(({ event }) => {
	console.error(event);

	if (!event.updateResumeStatusTo) return;

	return service(
		{
			dynamo: getDynamoInstance(),
		},
		{
			userId: event.userId,
			resumeId: event.resumeId,
			updateResumeStatusTo: event.updateResumeStatusTo,
		},
	);
});
