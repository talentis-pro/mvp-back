import type { Callback, Context } from "aws-lambda";

import { validateHeaders } from "./validate-headers";

import type { Func } from "../types/route";

interface Config {
	isPublic?: boolean;
}

export const makeController =
	<T = any>(func: Func<T>, { isPublic }: Config = {}) =>
	async (event: T, context: Context, callback: Callback): Promise<any> => {
		try {
			const hasToken: string =
				(event as any)?.headers?.authorization ||
				(event as any)?.headers?.Authorization;

			if (!isPublic || (hasToken && !hasToken.startsWith("AWS4-HMAC-SHA256"))) {
				validateHeaders((event as any)?.headers);
			}

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
