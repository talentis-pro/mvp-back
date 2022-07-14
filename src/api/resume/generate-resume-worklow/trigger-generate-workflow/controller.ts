import type { SQSEvent } from "aws-lambda";
import { getSfnInstance } from "config/sfn";
import { makeController } from "helpers/make-controller";

import { service } from "./service";

export const controller = makeController<SQSEvent>(({ event }) => {
	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	const params = JSON.parse(event.Records[0].body || "{}");

	return service(
		{
			sfn: getSfnInstance(),
		},
		params,
	);
});
