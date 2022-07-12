import type { APIGatewayEvent } from "aws-lambda";
import { getDynamoInstance } from "config/dynamo";
import { makeController } from "helpers/make-controller";
import { getTokenData } from "utils/auth-tokens/get-token-data";

import { service } from "./service";
import { validate } from "./validate";

export const controller = makeController<APIGatewayEvent>(async ({ event }) => {
	const { userId } = await getTokenData({ event });

	const params = await validate({ userId } as any);

	const dynamo = getDynamoInstance();

	return service(
		{
			dynamo,
		},
		params,
	);
});
