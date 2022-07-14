import type { BaseSection } from "./base";

import type { SectionTypeEnum } from "../../../enums/section-type";

export interface EducationsSectionItem {
	visible: boolean;
	companyId?: string;
	schoolName: string;
	degree: string;
	fieldOfStudy: string;
	description?: string;
	startDate: Date;
	endDate: Date;
}

export interface EducationsSection extends BaseSection {
	type: SectionTypeEnum.EDUCATIONS;
	items: Array<EducationsSectionItem>;
}
