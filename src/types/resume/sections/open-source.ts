import type { BaseSection } from "./base";

import type { SectionTypeEnum } from "../../../enums/section-type";

export interface OpenSourceSectionItem {
	title: string;
	description?: string;
	url?: string;
}

export interface OpenSourceSection extends BaseSection {
	type: SectionTypeEnum.OPEN_SOURCES;
	items: Array<OpenSourceSectionItem>;
}
