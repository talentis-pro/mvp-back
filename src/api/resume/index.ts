import { createResume } from "./create-resume/handler";
import { deleteResume } from "./delete-resume/handler";
import { editResumeName } from "./edit-resume-name/handler";
import { getUserResumes } from "./get-user-resumes/handler";

export const resumeDomain = {
	resumeDomainCreateResume: createResume,
	resumeDomainGetUserResumes: getUserResumes,
	resumeDomainDeleteResume: deleteResume,
	resumeDomainEditResumeName: editResumeName,
};
