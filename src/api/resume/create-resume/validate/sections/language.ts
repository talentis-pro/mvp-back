/* eslint-disable @typescript-eslint/no-magic-numbers */

import {
	IsDefined,
	Equals,
	IsArray,
	ValidateNested,
	ArrayMinSize,
	IsString,
} from "class-validator";

import { SectionTypeEnum } from "enums/section-type";

export class LanguageSection {
	@IsDefined()
	@Equals(SectionTypeEnum.LANGUAGES)
	public type: SectionTypeEnum.LANGUAGES;

	@IsDefined()
	@IsArray()
	@ValidateNested({ each: true })
	@ArrayMinSize(1)
	@IsString({ each: true })
	public items: Array<string>;
}
