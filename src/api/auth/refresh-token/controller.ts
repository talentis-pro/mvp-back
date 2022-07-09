import type { APIGatewayEvent } from "aws-lambda";
import { getPostgreInstance } from "config/postgres";
import { makeController } from "helpers/make-controller";

import { service } from "./service";
import { validate } from "./validate";

export const controller = makeController<APIGatewayEvent>(
	async ({ event }) => {
		const postgre = await getPostgreInstance();

		const params = await validate((event.body || {}) as any);

		return service(
			{
				postgre,
			},
			params,
		);
	},
	{
		isPublic: true,
	},
);
