/* eslint-disable @typescript-eslint/no-magic-numbers */

import { getEnumValues } from "@techmmunity/utils";
import { Type } from "class-transformer";
import {
	IsString,
	IsDefined,
	IsOptional,
	Equals,
	IsArray,
	ValidateNested,
	ArrayMinSize,
	IsIn,
} from "class-validator";

import { KnowledgeLevelEnum } from "enums/knowledge-level";
import { SectionTypeEnum } from "enums/section-type";

class SkillsSectionItem {
	@IsDefined()
	@IsString()
	public name: string;

	@IsOptional()
	@IsString()
	@IsIn(getEnumValues(KnowledgeLevelEnum))
	public level?: KnowledgeLevelEnum;
}

export class SkillsSection {
	@IsDefined()
	@Equals(SectionTypeEnum.SKILLS)
	public type: SectionTypeEnum.SKILLS;

	@IsDefined()
	@IsArray()
	@ValidateNested({ each: true })
	@ArrayMinSize(1)
	@Type(() => SkillsSectionItem)
	public items: Array<SkillsSectionItem>;
}
