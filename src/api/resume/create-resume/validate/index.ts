/* eslint-disable @typescript-eslint/no-magic-numbers */

import { CustomError } from "utils/error";
import { makeValidate } from "utils/validate";

import type { ServiceParams } from "../service";

import { resumeSchema } from "./resume";
import { educationSectionSchema } from "./sections/education";
import { employmentSectionSchema } from "./sections/employment";
import { languagesSectionSchema } from "./sections/language";
import { locationSectionSchema } from "./sections/location";
import { openSourceSectionSchema } from "./sections/open-source";
import { organizationSectionSchema } from "./sections/organization";
import { personalInformationSectionSchema } from "./sections/personal-information";
import { portfolioSectionSchema } from "./sections/portfolio";
import { salaryExpectationSectionSchema } from "./sections/salary-expectation";
import { skillsSectionSchema } from "./sections/skills";

import { SectionTypeEnum } from "enums/section-type";
import { StatusCodeEnum } from "enums/status-code";

export const validate = async (params: ServiceParams) => {
	const initialValidate = makeValidate<ServiceParams>(resumeSchema);

	const result = await initialValidate(params);

	const { sections: rawSections } = result;

	const sections = rawSections.map(section => {
		switch (section.type) {
			case SectionTypeEnum.EDUCATIONS: {
				const educationsValidate = makeValidate<ServiceParams>(
					educationSectionSchema,
				);

				return educationsValidate(section);
			}

			case SectionTypeEnum.EMPLOYMENTS: {
				const employmentsValidate = makeValidate<ServiceParams>(
					employmentSectionSchema,
				);

				return employmentsValidate(section);
			}

			case SectionTypeEnum.LANGUAGES: {
				const languageValidate = makeValidate<ServiceParams>(
					languagesSectionSchema,
				);

				return languageValidate(section);
			}

			case SectionTypeEnum.LOCATION: {
				const locationValidate = makeValidate<ServiceParams>(
					locationSectionSchema,
				);

				return locationValidate(section);
			}

			case SectionTypeEnum.OPEN_SOURCES: {
				const openSourceValidate = makeValidate<ServiceParams>(
					openSourceSectionSchema,
				);

				return openSourceValidate(section);
			}

			case SectionTypeEnum.ORGANIZATIONS: {
				const organizationsValidate = makeValidate<ServiceParams>(
					organizationSectionSchema,
				);

				return organizationsValidate(section);
			}

			case SectionTypeEnum.PERSONAL_INFORMATION: {
				const personalInformationValidate = makeValidate<ServiceParams>(
					personalInformationSectionSchema,
				);

				return personalInformationValidate(section);
			}

			case SectionTypeEnum.PORTFOLIO: {
				const portfolioValidate = makeValidate<ServiceParams>(
					portfolioSectionSchema,
				);

				return portfolioValidate(section);
			}

			case SectionTypeEnum.SALARY_EXPECTATION: {
				const salaryExpectationValidate = makeValidate<ServiceParams>(
					salaryExpectationSectionSchema,
				);

				return salaryExpectationValidate(section);
			}

			case SectionTypeEnum.SKILLS: {
				const skillsValidate = makeValidate<ServiceParams>(skillsSectionSchema);

				return skillsValidate(section);
			}

			default: {
				throw new CustomError(
					`Invalid Section Type: ${section.type}`,
					StatusCodeEnum.BAD_REQUEST,
				);
			}
		}
	});

	return {
		...result,
		sections,
	};
};
