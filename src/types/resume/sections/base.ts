import type { SectionTypeEnum } from "../../../enums/section-type";

export interface BaseSection {
	type: SectionTypeEnum;
	visible: boolean;
}
