import type { BaseSection } from "./base";

import type { SectionTypeEnum } from "../../../enums/section-type";

export interface LanguagesSection extends BaseSection {
	type: SectionTypeEnum.LANGUAGES;
	items: Array<string>;
}
