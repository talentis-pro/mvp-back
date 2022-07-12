/* eslint-disable capitalized-comments */
/* eslint-disable multiline-comment-style */
/**
 * This file cannot use absolute paths!
 */
import { getHandlerPath } from "../../../helpers/get-handler-path";
import { makeHandler } from "../../../helpers/make-handler";

export const getUserResumes = makeHandler({
	handler: `${getHandlerPath(__dirname)}/controller.controller`,
	events: [
		{
			http: {
				cors: true,
				method: "GET",
				path: "resumes",
			},
		},
	],
});
