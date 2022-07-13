/* eslint-disable @typescript-eslint/no-magic-numbers */

import { getEnumValues } from "@techmmunity/utils";
import {
	IsDefined,
	Equals,
	IsString,
	IsIn,
	IsEmail,
	IsOptional,
	IsUrl,
} from "class-validator";
import { IsIsoDate } from "utils/validate/is-iso-date";
import { StartsWith } from "utils/validate/starts-with";

import { CurrencyEnum } from "enums/currency";
import { SectionTypeEnum } from "enums/section-type";

export class PersonalInformationSection {
	@IsDefined()
	@Equals(SectionTypeEnum.PERSONAL_INFORMATION)
	public type: SectionTypeEnum.PERSONAL_INFORMATION;

	@IsDefined()
	@IsString()
	public name: string;

	@IsDefined()
	@IsString()
	public headline: string;

	@IsDefined()
	@IsString()
	public aboutMe: string;

	@IsDefined()
	@IsIsoDate()
	public birthDay: string;

	@IsDefined()
	@IsString()
	@IsEmail()
	public email: string;

	@IsDefined()
	@IsString()
	public phone: string;

	@IsOptional()
	@IsString()
	@IsUrl()
	@StartsWith("https://www.linkedin.com/in/")
	public linkedin?: string;

	@IsOptional()
	@IsString()
	@IsUrl()
	@StartsWith("https://github.com/")
	public github?: string;

	@IsDefined()
	@IsString()
	@IsIn(getEnumValues(CurrencyEnum))
	public currency: CurrencyEnum;
}
