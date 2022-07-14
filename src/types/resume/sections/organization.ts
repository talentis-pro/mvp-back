import type { BaseSection } from "./base";

import type { SectionTypeEnum } from "../../../enums/section-type";

export interface OrganizationsSectionItem {
	companyId?: string;
	title: string;
	description?: string;
	url?: string;
	role: string;
	startDate: Date;
	endDate?: Date;
}

export interface OrganizationsSection extends BaseSection {
	type: SectionTypeEnum.ORGANIZATIONS;
	items: Array<OrganizationsSectionItem>;
}
