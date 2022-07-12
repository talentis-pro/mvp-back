import type { Callback, Context } from "aws-lambda";
import { getPostgreInstance } from "config/postgres";
import { CustomError } from "utils/error";

import { validateHeaders } from "./validate-headers";

import type { PostgreFunc } from "../types/route";
import { StatusCodeEnum } from "enums/status-code";
import type { PostgreDbClient } from "types/db";

interface Config {
	isPublic?: boolean;
}

export const makePostgreController =
	<T = any>(func: PostgreFunc<T>, { isPublic }: Config = {}) =>
	async (event: T, context: Context, callback: Callback): Promise<any> => {
		// Needs to have a default value, or TypeScript cries
		let postgre = {} as PostgreDbClient;

		try {
			const hasToken: string =
				(event as any)?.headers?.authorization ||
				(event as any)?.headers?.Authorization;

			if (!isPublic || (hasToken && !hasToken.startsWith("AWS4-HMAC-SHA256"))) {
				validateHeaders((event as any)?.headers);
			}

			postgre = await getPostgreInstance();

			const result = await func({
				event,
				context,
				callback,
				postgre,
			});

			await postgre.end();

			return result;
		} catch (err: any) {
			console.error(err);

			if (postgre.end) {
				await postgre.end();
			}

			if (err instanceof CustomError) {
				return err;
			}

			return {
				statusCode: err.statusCode || StatusCodeEnum.INTERNAL,
				body: JSON.stringify({
					error: err.message,
				}),
			};
		}
	};
