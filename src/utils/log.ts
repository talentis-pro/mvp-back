/* eslint-disable no-console */

export const log = (name: string, data: Record<string, any>) => {
	if (process.env.NODE_ENV !== "production") {
		// eslint-disable-next-line @typescript-eslint/no-magic-numbers
		console.log(`${name.toUpperCase()} :: ${JSON.stringify(data, null, 2)}`);
	}
};
