/* eslint-disable @typescript-eslint/no-magic-numbers */

import { Type } from "class-transformer";
import {
	IsString,
	IsDefined,
	IsOptional,
	Equals,
	IsArray,
	ValidateNested,
	ArrayMinSize,
} from "class-validator";
import { IsIsoDate } from "utils/validate/is-iso-date";

import { SectionTypeEnum } from "enums/section-type";

class OrganizationSectionItem {
	@IsOptional()
	@IsString()
	public companyId?: string;

	@IsDefined()
	@IsString()
	public title: string;

	@IsOptional()
	@IsString()
	public description?: string;

	@IsOptional()
	@IsString()
	public url?: string;

	@IsDefined()
	@IsString()
	public role: string;

	@IsDefined()
	@IsIsoDate()
	public startDate: string;

	@IsOptional()
	@IsIsoDate()
	public endDate?: string;
}

export class OrganizationSection {
	@IsDefined()
	@Equals(SectionTypeEnum.ORGANIZATIONS)
	public type: SectionTypeEnum.ORGANIZATIONS;

	@IsDefined()
	@IsArray()
	@ValidateNested({ each: true })
	@ArrayMinSize(1)
	@Type(() => OrganizationSectionItem)
	public items: Array<OrganizationSectionItem>;
}
