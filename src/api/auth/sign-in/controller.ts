import type { APIGatewayEvent } from "aws-lambda";
import { makePostgreController } from "helpers/make-postgres-controller";
import { genAllTokens } from "utils/auth-tokens/gen-all-tokens";

import { service } from "./service";
import { validate } from "./validate";

export const controller = makePostgreController<APIGatewayEvent>(
	async ({ event, postgre }) => {
		const params = await validate((event.body || {}) as any);

		return service(
			{
				postgre,
				genAllTokens,
			},
			params,
		);
	},
	{
		isPublic: true,
	},
);
