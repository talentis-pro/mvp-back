import { genAccessToken } from "./gen-access-token";
import { genRefreshToken } from "./gen-refresh-token";

import type { PostgreDbClient } from "types/db";

interface GenAllTokens {
	userId: string;
	postgre: PostgreDbClient;
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
