import type { Callback, Context } from "aws-lambda";

import type { Func } from "../types/route";

interface Config {
	isPublic?: boolean;
}

export const makeController =
	<T = any>(func: Func<T>, _: Config = {}) =>
	async (event: T, context: Context, callback: Callback): Promise<any> => {
		try {
			const result = await func({
				event,
				context,
				callback,
			});

			return result;
		} catch (err: any) {
			console.error(err);
		}
	};
