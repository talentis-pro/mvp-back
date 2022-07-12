import type { APIGatewayEvent } from "aws-lambda";
import { getSesInstance } from "config/ses";
import { makePostgreController } from "helpers/make-postgres-controller";

import { service } from "./service";
import { validate } from "./validate";

export const controller = makePostgreController<APIGatewayEvent>(
	async ({ event, postgre }) => {
		const params = await validate((event.body || {}) as any);

		return service(
			{
				postgre,
				ses: getSesInstance(),
			},
			params,
		);
	},
	{
		isPublic: true,
	},
);
