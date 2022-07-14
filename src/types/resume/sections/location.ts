import type { BaseSection } from "./base";

import type { CountryEnum } from "../../../enums/country";
import type { SectionTypeEnum } from "../../../enums/section-type";

export interface LocationSection extends BaseSection {
	type: SectionTypeEnum.LOCATION;
	line1?: string;
	line2?: string;
	postalCode?: string;
	city?: string;
	state: string;
	country: CountryEnum;
}
