export interface Token {
	sub: string; // `COMPANY#${companyId}#USER#${userId}`
	iss: string; // "sellingrockets.com.br",
	iat: number;
	exp: number;
}
