import type { APIGatewayEvent } from "aws-lambda";
import { V1 } from "paseto";

import type { Token } from "types/token";

interface GetTokenDataParams {
	event: APIGatewayEvent;
}

export const getTokenData = async (event: GetTokenDataParams) => {
	const authHeader: string =
		(event as any)?.headers?.authorization ||
		(event as any)?.headers?.Authorization;

	const isAwsHeader = authHeader.startsWith("AWS4-HMAC-SHA256");

	if (isAwsHeader) return {};

	const decoded = (await V1.decrypt(
		authHeader.split(" ").pop()!,
		process.env.PASETO_SECRET,
	)) as Token;

	return {
		userId: decoded.sub,
	};
};
