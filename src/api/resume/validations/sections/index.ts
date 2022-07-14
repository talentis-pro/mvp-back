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
import type { EducationsSection } from "types/resume/sections/education";
import type { EmploymentSection } from "types/resume/sections/employment";
import type { LanguagesSection } from "types/resume/sections/language";
import type { LocationSection } from "types/resume/sections/location";
import type { OpenSourceSection } from "types/resume/sections/open-source";
import type { OrganizationsSection } from "types/resume/sections/organization";
import type { PersonalInformationSection } from "types/resume/sections/personal-information";
import type { PortfolioSection } from "types/resume/sections/portfolio";
import type { SalaryExpectationSection } from "types/resume/sections/salary-expectation";
import type { SkillsSection } from "types/resume/sections/skill";

export const validateSectionsArray = (rawSections: Array<any>) =>
	Promise.all(
		rawSections.map(section => {
			switch (section.type) {
				case SectionTypeEnum.EDUCATIONS: {
					const educationsValidate = makeValidate<EducationsSection>(
						educationSectionSchema,
					);

					return educationsValidate(section);
				}

				case SectionTypeEnum.EMPLOYMENTS: {
					const employmentsValidate = makeValidate<EmploymentSection>(
						employmentSectionSchema,
					);

					return employmentsValidate(section);
				}

				case SectionTypeEnum.LANGUAGES: {
					const languageValidate = makeValidate<LanguagesSection>(
						languagesSectionSchema,
					);

					return languageValidate(section);
				}

				case SectionTypeEnum.LOCATION: {
					const locationValidate = makeValidate<LocationSection>(
						locationSectionSchema,
					);

					return locationValidate(section);
				}

				case SectionTypeEnum.OPEN_SOURCES: {
					const openSourceValidate = makeValidate<OpenSourceSection>(
						openSourceSectionSchema,
					);

					return openSourceValidate(section);
				}

				case SectionTypeEnum.ORGANIZATIONS: {
					const organizationsValidate = makeValidate<OrganizationsSection>(
						organizationSectionSchema,
					);

					return organizationsValidate(section);
				}

				case SectionTypeEnum.PERSONAL_INFORMATION: {
					const personalInformationValidate =
						makeValidate<PersonalInformationSection>(
							personalInformationSectionSchema,
						);

					return personalInformationValidate(section);
				}

				case SectionTypeEnum.PORTFOLIO: {
					const portfolioValidate = makeValidate<PortfolioSection>(
						portfolioSectionSchema,
					);

					return portfolioValidate(section);
				}

				case SectionTypeEnum.SALARY_EXPECTATION: {
					const salaryExpectationValidate =
						makeValidate<SalaryExpectationSection>(
							salaryExpectationSectionSchema,
						);

					return salaryExpectationValidate(section);
				}

				case SectionTypeEnum.SKILLS: {
					const skillsValidate =
						makeValidate<SkillsSection>(skillsSectionSchema);

					return skillsValidate(section);
				}

				default: {
					throw new CustomError(
						`Invalid Section Type: ${section.type}`,
						StatusCodeEnum.BAD_REQUEST,
					);
				}
			}
		}),
	);
