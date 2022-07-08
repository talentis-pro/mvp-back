import type { APIGatewayEvent } from "aws-lambda";
import { decode } from "jsonwebtoken";

import type { Token } from "types/token";

interface GetTokenDataParams {
	event: APIGatewayEvent;
}

export const getTokenData = (event: GetTokenDataParams) => {
	const authHeader: string =
		(event as any)?.headers?.authorization ||
		(event as any)?.headers?.Authorization;

	const isAwsHeader = authHeader.startsWith("AWS4-HMAC-SHA256");

	if (isAwsHeader) return {};

	const decoded = decode(authHeader.split(" ").pop()!) as Token;

	const [, companyId, , userId] = decoded.sub.split("#");

	return {
		companyId,
		userId,
	};
};
