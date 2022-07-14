import type { APIGatewayEvent } from "aws-lambda";
import { getDynamoInstance } from "config/dynamo";
import { getSqsInstance } from "config/sqs";
import { makeController } from "helpers/make-controller";
import { getTokenData } from "utils/auth-tokens/get-token-data";

import { service } from "./service";
import { validate } from "./validate";

export const controller = makeController<APIGatewayEvent>(async ({ event }) => {
	const { userId } = await getTokenData({ event });

	const params = await validate({
		...JSON.parse(event.body || "{}"),
		userId,
	} as any);

	const sqs = getSqsInstance();
	const dynamo = getDynamoInstance();

	return service(
		{
			dynamo,
			sqs,
		},
		params,
	);
});
