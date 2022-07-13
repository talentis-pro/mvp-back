/* eslint-disable @typescript-eslint/no-magic-numbers */

import { getEnumValues } from "@techmmunity/utils";
import { IsDefined, Equals, IsString, IsOptional, IsIn } from "class-validator";

import { CountryEnum } from "enums/country";
import { SectionTypeEnum } from "enums/section-type";

export class LocationSection {
	@IsDefined()
	@Equals(SectionTypeEnum.LOCATION)
	public type: SectionTypeEnum.LOCATION;

	@IsOptional()
	@IsString()
	public line1?: string;

	@IsOptional()
	@IsString()
	public line2?: string;

	@IsOptional()
	@IsString()
	public postalCode?: string;

	@IsOptional()
	@IsString()
	public city?: string;

	@IsDefined()
	@IsString()
	public state: string;

	@IsDefined()
	@IsString()
	@IsIn(getEnumValues(CountryEnum))
	public country: CountryEnum;
}
