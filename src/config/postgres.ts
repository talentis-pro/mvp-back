import { Client } from "pg";

export const getPostgreInstance = async () => {
	const client = new Client();

	await client.connect();

	return client;
};
