/* eslint-disable @typescript-eslint/naming-convention */
import type { SQSEvent } from "aws-lambda";

import type { LanguageEnum } from "enums/language";
import type { ResumeStatusEnum } from "enums/resume-status";
import type { Fonts, FontUsed } from "types/resume/fonts";
import type { Months } from "types/resume/months";
import type { Sections } from "types/resume/sections";

export interface GenerateResumeEvent<PhrasesToFill = Record<string, any>>
	extends SQSEvent {
	// Trigger Generate Workflow
	userId: string;
	resumeId: string;
	templateId: string;
	language: LanguageEnum;
	// Get Data
	months: Months;
	phrasesToFill: PhrasesToFill;
	sections: Sections;
	fontsUsed: Array<FontUsed>;
	// Get Fonts
	fonts: Fonts;
	// Update Resume Status
	updateResumeStatusTo: ResumeStatusEnum;
}
