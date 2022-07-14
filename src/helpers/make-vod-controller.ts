import type { Callback, Context } from "aws-lambda";

import type { GenerateResumeEvent } from "../api/resume/generate-resume-worklow/types";

import type {
	GenerateResumeFunc,
	GenerateResumeRouteOutput,
} from "types/route";

export const makeGenerateResumeController =
	(func: GenerateResumeFunc<GenerateResumeEvent>) =>
	async (
		event: GenerateResumeEvent,
		context: Context,
		callback: Callback,
	): Promise<GenerateResumeRouteOutput | void> => {
		const result = await func({
			event,
			context,
			callback,
		});

		if (result) {
			return { ...event, ...result };
		}

		return event;
	};
