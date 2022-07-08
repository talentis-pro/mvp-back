import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import type { DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";

export const getDynamoInstance = (config: DynamoDBClientConfig = {}) => {
	const { NODE_ENV } = process.env;

	if (NODE_ENV === "local") {
		return {
			send: () => {},
		} as unknown as DynamoDBClient;
	}

	return new DynamoDBClient(config);
};
