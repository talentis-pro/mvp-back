/* eslint-disable @typescript-eslint/no-magic-numbers */

import { Type } from "class-transformer";
import {
	IsString,
	IsUUID,
	IsDefined,
	IsOptional,
	IsBoolean,
	Equals,
	IsArray,
	ValidateNested,
	ArrayMinSize,
} from "class-validator";
import { IsIsoDate } from "utils/validate/is-iso-date";

import { SectionTypeEnum } from "enums/section-type";

class EmploymentSectionItem {
	@IsDefined()
	@IsBoolean()
	public visible: boolean;

	@IsOptional()
	@IsUUID("4")
	public companyId?: string;

	@IsDefined()
	@IsString()
	public companyName: string;

	@IsOptional()
	@IsString()
	public description?: string;

	@IsDefined()
	@IsString()
	public location: string;

	@IsDefined()
	@IsString()
	public role: string;

	@IsDefined()
	@IsIsoDate()
	public startDate: string;

	@IsOptional()
	@IsIsoDate()
	public endDate?: string;

	@IsDefined()
	@IsArray()
	@ValidateNested({ each: true })
	@ArrayMinSize(1)
	@Type(() => String)
	public inChargeOf: Array<string>;

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@ArrayMinSize(1)
	@Type(() => String)
	@IsString({ each: true })
	public skills?: Array<string>;
}

export class EmploymentSection {
	@IsDefined()
	@Equals(SectionTypeEnum.EMPLOYMENTS)
	public type: SectionTypeEnum.EMPLOYMENTS;

	@IsDefined()
	@IsArray()
	@ValidateNested({ each: true })
	@ArrayMinSize(1)
	@Type(() => EmploymentSectionItem)
	public items: Array<EmploymentSectionItem>;
}
