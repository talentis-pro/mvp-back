import type { BaseSection } from "./base";

import type { SectionTypeEnum } from "../../../enums/section-type";

export interface EmploymentSectionItem {
	visible: boolean;
	companyId?: string;
	companyName: string;
	description?: string;
	location: string;
	role: string;
	startDate: Date;
	endDate?: Date;
	inChargeOf: Array<string>;
	skills?: Array<string>;
}

export interface EmploymentSection extends BaseSection {
	type: SectionTypeEnum.EMPLOYMENTS;
	items: Array<EmploymentSectionItem>;
}
