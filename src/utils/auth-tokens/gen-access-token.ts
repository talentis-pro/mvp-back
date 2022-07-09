import { V1 } from "paseto";
import { dayjs } from "utils/date";

interface GenAccessTokenParams {
	userId: string;
}

export const genAccessToken = async ({ userId }: GenAccessTokenParams) => {
	// eslint-disable-next-line @typescript-eslint/no-magic-numbers
	const expiration = dayjs().add(10, "minute");

	const accessToken = await V1.sign(
		{
			sub: userId,
			iss: "melhorquelinkedinho.com.br",
			iat: dayjs().unix(),
			exp: expiration.unix(),
		},
		process.env.PASETO_SECRET!,
	);

	return {
		accessToken,
		expirationDate: expiration.toISOString(),
	};
};

export type GenAccessTokenType = typeof genAccessToken;
