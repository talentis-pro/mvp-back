import { sign } from "jsonwebtoken";
import { dayjs } from "utils/date";

import type { UserRoleEnum } from "enums/user-role";

interface GenAccessTokenParams {
	companyId: string;
	userId: string;
	role: UserRoleEnum;
}

export const genAccessToken = ({
	companyId,
	userId,
	role,
}: GenAccessTokenParams) => {
	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	const expiration = dayjs().add(10, "minute");

	const pstToken = sign(
		{
			sub: `COMPANY#${companyId}#USER#${userId}`,
			role,
			iss: "sellingrockets.com.br",
			iat: dayjs().unix(),
			exp: expiration.unix(),
		},
		process.env.JWT_SECRET,
	);

	const accessToken = pstToken.replace("Bearer ", "");

	return {
		accessToken,
		expirationDate: expiration.toISOString(),
	};
};

export type GenAccessTokenType = typeof genAccessToken;
