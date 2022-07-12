import type { APIGatewayEvent } from "aws-lambda";
import { getDynamoInstance } from "config/dynamo";
import { makeController } from "helpers/make-controller";

import { service } from "./service";

export const controller = makeController<APIGatewayEvent>(() => {
	return service(
		{
			dynamo: getDynamoInstance(),
		},
		{},
	);
});
