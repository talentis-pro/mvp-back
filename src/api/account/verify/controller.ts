import type { APIGatewayEvent } from "aws-lambda";
import { getDynamoInstance } from "config/dynamo";
import { getStripeInstance } from "config/stripe";
import { makeController } from "helpers/make-controller";

import { service } from "./service";
import { validate } from "./validate";

export const controller = makeController<APIGatewayEvent>(
	async ({ event }) => {
		const params = await validate((event.body || {}) as any);

		return service(
			{
				dynamo: getDynamoInstance(),
				stripe: getStripeInstance(),
			},
			params,
		);
	},
	{
		isPublic: true,
	},
);
