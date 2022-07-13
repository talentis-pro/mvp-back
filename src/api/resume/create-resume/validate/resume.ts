/* eslint-disable @typescript-eslint/no-magic-numbers */

import { getEnumValues } from "@techmmunity/utils";
import {
	IsString,
	IsUUID,
	IsDefined,
	IsIn,
	MinLength,
	IsArray,
} from "class-validator";

import { LanguageEnum } from "enums/language";

export class Resume {
	@IsDefined()
	@IsUUID("4")
	public userId: string;

	@IsDefined()
	@IsUUID("4")
	public templateId: string;

	@IsDefined()
	@IsString()
	public name: string;

	@IsDefined()
	@IsIn(getEnumValues(LanguageEnum))
	public language: string;

	@IsDefined()
	@MinLength(1)
	@IsArray()
	public sections: Array<any>;
}
