import type { APIGatewayEvent } from "aws-lambda";
import { getDynamoInstance } from "config/dynamo";
import { makeController } from "helpers/make-controller";
import { genAllTokens } from "utils/auth-tokens/gen-all-tokens";

import { service } from "./service";
import { validate } from "./validate";

export const controller = makeController<APIGatewayEvent>(
	async ({ event }) => {
		const params = await validate((event.body || {}) as any);

		return service(
			{
				dynamo: getDynamoInstance(),
				genAllTokens,
			},
			params,
		);
	},
	{
		isPublic: true,
	},
);
