import type { Callback, Context } from "aws-lambda";

import type { StatusCodeEnum } from "../enums/status-code";

interface RouteInput<T> {
	event: T;
	context: Context;
	callback: Callback;
}

export interface RouteOutput {
	headers?: Record<string, any>;
	statusCode: StatusCodeEnum;
	body?: string;
}

export type VodRouteOutput = Record<string, any>;

export type Route<T> = (
	p: RouteInput<T>,
) => Promise<RouteOutput> | Promise<void> | RouteOutput | void;

export type AnyFunc<T> = (p: RouteInput<T>) => any;

export type Func<T> = (
	p: RouteInput<T>,
) => Promise<RouteOutput> | Promise<void> | RouteOutput | void;

export type DatabaselessFunc<T> = (
	p: RouteInput<T>,
) => Promise<RouteOutput> | Promise<void> | RouteOutput | void;

export type VodFunc<T> = (
	p: RouteInput<T>,
) => Promise<VodRouteOutput> | Promise<void> | VodRouteOutput | void;
