import { deleteResume } from "./delete-resume/handler";
import { getUserResumes } from "./get-user-resumes/handler";

export const resumeDomain = {
	resumeDomainGetUserResumes: getUserResumes,
	resumeDomainDeleteResume: deleteResume,
};
