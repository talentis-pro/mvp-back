import { errorHandler } from "api/resume/generate-resume-workflow/handle-error";
import type { Callback, Context } from "aws-lambda";

import type { GenerateResumeEvent } from "../api/resume/generate-resume-workflow/types";

import type {
	GenerateResumeFunc,
	GenerateResumeRouteOutput,
} from "types/route";

export const makeGenerateResumeController =
	<Event = GenerateResumeEvent>(func: GenerateResumeFunc<Event>) =>
	async (
		event: Event,
		context: Context,
		callback: Callback,
	): Promise<GenerateResumeRouteOutput | void> => {
		try {
			const result = await func({
				event,
				context,
				callback,
			});

			if (result) {
				return { ...event, ...result };
			}

			return event;
		} catch (err: any) {
			await errorHandler(event, err);

			throw err;
		}
	};
