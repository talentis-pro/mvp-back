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

class PortfolioSectionItem {
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

export class PortfolioSection {
	@IsDefined()
	@Equals(SectionTypeEnum.PORTFOLIO)
	public type: SectionTypeEnum.PORTFOLIO;

	@IsDefined()
	@IsArray()
	@ValidateNested({ each: true })
	@ArrayMinSize(1)
	@Type(() => PortfolioSectionItem)
	public items: Array<PortfolioSectionItem>;
}
