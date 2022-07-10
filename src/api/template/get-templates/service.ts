/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/naming-convention */

import { isEmptyArray } from "@techmmunity/utils";
import { CustomError } from "utils/error";

import { StatusCodeEnum } from "enums/status-code";
import { TemplateStatusEnum } from "enums/template-status";
import type { PostgreDbClient } from "types/db";

interface Injectables {
	postgre: PostgreDbClient;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ServiceParams {}

export const service = async ({ postgre }: Injectables, _: ServiceParams) => {
	const records = await postgre.query(
		'SELECT * FROM templates WHERE "status" = $1;',
		[TemplateStatusEnum.AVAILABLE],
	);

	const templates = records.rows;

	if (isEmptyArray(templates)) {
		throw new CustomError("Not Found", StatusCodeEnum.NOT_FOUND);
	}

	return {
		statusCode: StatusCodeEnum.SUCCESS,
		body: JSON.stringify({
			templates,
		}),
	};
};
