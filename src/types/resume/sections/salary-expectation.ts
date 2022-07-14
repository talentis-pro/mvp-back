import type { BaseSection } from "./base";

import type { CurrencyEnum } from "../../../enums/currency";
import type { EmploymentTypeEnum } from "../../../enums/employment-type";
import type { SectionTypeEnum } from "../../../enums/section-type";
import type { WageTimeRangeEnum } from "../../../enums/wage-time-range";

export interface SalaryExpectationSectionItem {
	position?: string;
	employmentType?: EmploymentTypeEnum;
	value: number;
	currency: CurrencyEnum;
	wageTimeRange: WageTimeRangeEnum;
}

export interface SalaryExpectationSection extends BaseSection {
	type: SectionTypeEnum.SALARY_EXPECTATION;
	items: Array<SalaryExpectationSectionItem>;
}
