import type { SFNClientConfig } from "@aws-sdk/client-sfn";
import { SFNClient } from "@aws-sdk/client-sfn";

export const getSfnInstance = (config: SFNClientConfig = {}) => {
	const { NODE_ENV } = process.env;

	if (NODE_ENV === "local") {
		return {
			send: () => {},
		} as unknown as SFNClient;
	}

	return new SFNClient(config);
};
