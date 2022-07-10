import type { APIGatewayEvent } from "aws-lambda";
import { getPostgreInstance } from "config/postgres";
import { makeController } from "helpers/make-controller";

import { service } from "./service";

export const controller = makeController<APIGatewayEvent>(async () => {
	const postgre = await getPostgreInstance();

	return service(
		{
			postgre,
		},
		{},
	);
});
