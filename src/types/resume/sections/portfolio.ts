import type { BaseSection } from "./base";

import type { SectionTypeEnum } from "../../../enums/section-type";

export interface PortfolioSectionItem {
	title: string;
	description?: string;
	url?: string;
}

export interface PortfolioSection extends BaseSection {
	type: SectionTypeEnum.PORTFOLIO;
	items: Array<PortfolioSectionItem>;
}
