import type { BaseSection } from "./base";

import type { SectionTypeEnum } from "../../../enums/section-type";

export interface PersonalInformationSection extends BaseSection {
	type: SectionTypeEnum.PERSONAL_INFORMATION;
	name: string;
	headline: string;
	aboutMe: string;
	birthDay: Date;
	email: string;
	phone: string;
	linkedin: string;
	github?: string;
}
