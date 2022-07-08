import type { StatusCodeEnum } from "enums/status-code";

export class CustomError extends Error {
	public constructor(public body: string, public statusCode: StatusCodeEnum) {
		super(body);
	}
}
