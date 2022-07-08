import type { DynamoDBClient } from "@aws-sdk/client-dynamodb";

import { genAccessToken } from "./gen-access-token";
import { genRefreshToken } from "./gen-refresh-token";

import type { UserRoleEnum } from "enums/user-role";

interface GenAllTokens {
	companyId: string;
	userId: string;
	role: UserRoleEnum;
	dynamo?: DynamoDBClient;
}

export const genAllTokens = async (params: GenAllTokens) => {
	const [accessData, refreshData] = await Promise.all([
		genAccessToken(params),
		genRefreshToken(params),
	]);

	return {
		...accessData,
		...refreshData,
	};
};

export type GenAllTokensType = typeof genAllTokens;
