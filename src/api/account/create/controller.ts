import type { APIGatewayEvent } from "aws-lambda";
import { getDynamoInstance } from "config/dynamo";
import { getSesInstance } from "config/ses";
import { makeController } from "helpers/make-controller";

import { service } from "./service";
import { validate } from "./validate";

export const controller = makeController<APIGatewayEvent>(
	async ({ event }) => {
		const params = await validate((event.body || {}) as any);

		return service(
			{
				dynamo: getDynamoInstance(),
				ses: getSesInstance(),
			},
			params,
		);
	},
	{
		isPublic: true,
	},
);
