/* eslint-disable @typescript-eslint/no-magic-numbers */

import { getEnumValues } from "@techmmunity/utils";
import { IsDefined, Equals, IsString, IsIn, IsNumber } from "class-validator";

import { CurrencyEnum } from "enums/currency";
import { SectionTypeEnum } from "enums/section-type";

export class SalaryExpectationSection {
	@IsDefined()
	@Equals(SectionTypeEnum.SALARY_EXPECTATION)
	public type: SectionTypeEnum.SALARY_EXPECTATION;

	@IsDefined()
	@IsNumber()
	public value: number;

	@IsDefined()
	@IsString()
	@IsIn(getEnumValues(CurrencyEnum))
	public currency: CurrencyEnum;
}
