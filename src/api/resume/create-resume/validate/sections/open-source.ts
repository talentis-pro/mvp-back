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

import { SectionTypeEnum } from "enums/section-type";

class OpenSourceSectionItem {
	@IsDefined()
	@IsString()
	public title: string;

	@IsOptional()
	@IsString()
	public description?: string;

	@IsOptional()
	@IsString()
	public url?: string;
}

export class OpenSourceSection {
	@IsDefined()
	@Equals(SectionTypeEnum.OPEN_SOURCES)
	public type: SectionTypeEnum.OPEN_SOURCES;

	@IsDefined()
	@IsArray()
	@ValidateNested({ each: true })
	@ArrayMinSize(1)
	@Type(() => OpenSourceSectionItem)
	public items: Array<OpenSourceSectionItem>;
}
