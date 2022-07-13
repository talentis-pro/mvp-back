/* eslint-disable @typescript-eslint/no-magic-numbers */

import { getEnumValues } from "@techmmunity/utils";
import { yup } from "utils/yup";

import { KnowledgeLevelEnum } from "enums/knowledge-level";
import { SectionTypeEnum } from "enums/section-type";

export const skillsSectionSchema = yup
	.object()
	.strict()
	.shape({
		type: yup.string().strict().required().equals([SectionTypeEnum.SKILLS]),
		items: yup
			.array()
			.strict()
			.required()
			.min(1)
			.of(
				yup
					.object()
					.strict()
					.required()
					.shape({
						name: yup.string().strict().required(),
						url: yup
							.string()
							.strict()
							.notRequired()
							.oneOf(getEnumValues(KnowledgeLevelEnum)),
					}),
			),
	});
