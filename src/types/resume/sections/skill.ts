import type { BaseSection } from "./base";

import type { KnowledgeLevelEnum } from "../../../enums/knowledge-level";
import type { SectionTypeEnum } from "../../../enums/section-type";

export interface SkillsSectionItem {
	name: string;
	level?: KnowledgeLevelEnum;
}

export interface SkillsSection extends BaseSection {
	type: SectionTypeEnum.SKILLS;
	sectionSpecialTitle?: string;
	items: Array<SkillsSectionItem>;
}
