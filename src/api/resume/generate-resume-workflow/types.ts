/* eslint-disable @typescript-eslint/naming-convention */
import type { SQSEvent } from "aws-lambda";

import type { LanguageEnum } from "enums/language";
import type { ResumeStatusEnum } from "enums/resume-status";
import type { Fonts } from "types/resume/fonts";
import type { Months } from "types/resume/months";
import type { Sections } from "types/resume/sections";

export interface GenerateResumeEvent<PhrasesToFill = Record<string, any>>
	extends SQSEvent {
	userId: string;
	resumeId: string;
	templateId: string;
	months: Months;
	phrasesToFill: PhrasesToFill;
	sections: Sections;
	fonts: Fonts;
	language: LanguageEnum;
	updateResumeStatusTo: ResumeStatusEnum;
}
