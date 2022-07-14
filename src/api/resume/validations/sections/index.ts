import type { ServiceParams } from "api/auth/refresh-token/service";
import { CustomError } from "utils/error";
import { makeValidate } from "utils/validate";

import { educationSectionSchema } from "./education";
import { employmentSectionSchema } from "./employment";
import { languagesSectionSchema } from "./language";
import { locationSectionSchema } from "./location";
import { openSourceSectionSchema } from "./open-source";
import { organizationSectionSchema } from "./organization";
import { personalInformationSectionSchema } from "./personal-information";
import { portfolioSectionSchema } from "./portfolio";
import { salaryExpectationSectionSchema } from "./salary-expectation";
import { skillsSectionSchema } from "./skills";

import { SectionTypeEnum } from "enums/section-type";
import { StatusCodeEnum } from "enums/status-code";

export const validateSectionsArray = (rawSections: Array<any>) =>
	rawSections.map(section => {
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
