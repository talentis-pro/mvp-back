import { SQSClient } from "@aws-sdk/client-sqs";

export const getSqsInstance = () => {
	const { NODE_ENV } = process.env;

	if (NODE_ENV === "local") {
		return {
			send: () => {},
		} as unknown as SQSClient;
	}

	return new SQSClient({});
};
