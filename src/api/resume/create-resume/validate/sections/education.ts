/* eslint-disable @typescript-eslint/no-magic-numbers */

import { getEnumValues } from "@techmmunity/utils";
import { Type } from "class-transformer";
import {
	IsString,
	IsUUID,
	IsDefined,
	IsOptional,
	IsIn,
	IsBoolean,
	Equals,
	IsArray,
	ValidateNested,
	ArrayMinSize,
} from "class-validator";
import { IsIsoDate } from "utils/validate/is-iso-date";

import { DegreeEnum } from "enums/degree";
import { SectionTypeEnum } from "enums/section-type";

class EducationSectionItem {
	@IsDefined()
	@IsBoolean()
	public visible: boolean;

	@IsOptional()
	@IsUUID("4")
	public companyId?: string;

	@IsDefined()
	@IsString()
	public schoolName: string;

	@IsDefined()
	@IsString()
	@IsIn(getEnumValues(DegreeEnum))
	public degree: DegreeEnum;

	@IsDefined()
	@IsString()
	public fieldOfStudy: string;

	@IsOptional()
	@IsString()
	public description?: string;

	@IsDefined()
	@IsIsoDate()
	public startDate: string;

	@IsDefined()
	@IsIsoDate()
	public endDate: string;
}

export class EducationSection {
	@IsDefined()
	@Equals(SectionTypeEnum.EDUCATIONS)
	public type: SectionTypeEnum.EDUCATIONS;

	@IsDefined()
	@IsArray()
	@ValidateNested({ each: true })
	@ArrayMinSize(1)
	@Type(() => EducationSectionItem)
	public items: Array<EducationSectionItem>;
}
