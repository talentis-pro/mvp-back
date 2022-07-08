import { SESClient } from "@aws-sdk/client-ses";

export const getSesInstance = () => {
	const { NODE_ENV } = process.env;

	if (NODE_ENV === "local") {
		return {
			send: () => {},
		} as unknown as SESClient;
	}

	return new SESClient({});
};
