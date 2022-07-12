import type { APIGatewayEvent } from "aws-lambda";
import { makePostgreController } from "helpers/make-postgres-controller";

import { service } from "./service";

export const controller = makePostgreController<APIGatewayEvent>(
	({ postgre }) => {
		return service(
			{
				postgre,
			},
			{},
		);
	},
);
