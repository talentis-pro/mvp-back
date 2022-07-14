import type { EducationsSection } from "./education";
import type { EmploymentSection } from "./employment";
import type { LanguagesSection } from "./language";
import type { LocationSection } from "./location";
import type { OpenSourceSection } from "./open-source";
import type { OrganizationsSection } from "./organization";
import type { PersonalInformationSection } from "./personal-information";
import type { PortfolioSection } from "./portfolio";
import type { SalaryExpectationSection } from "./salary-expectation";
import type { SkillsSection } from "./skill";

export type Section =
	| EducationsSection
	| EmploymentSection
	| LanguagesSection
	| LocationSection
	| OpenSourceSection
	| OrganizationsSection
	| PersonalInformationSection
	| PortfolioSection
	| SalaryExpectationSection
	| SkillsSection;

export type Sections = Array<Section>;
