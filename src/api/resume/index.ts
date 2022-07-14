import { createResume } from "./create-resume/handler";
import { deleteResume } from "./delete-resume/handler";
import { editResumeName } from "./edit-resume-name/handler";
import { editResume } from "./edit-resume/handler";
import { getUserResumes } from "./get-user-resumes/handler";

export const resumeDomain = {
	resumeDomainCreateResume: createResume,
	resumeDomainDeleteResume: deleteResume,
	resumeDomainEditResumeName: editResumeName,
	resumeDomainEditResume: editResume,
	resumeDomainGetUserResumes: getUserResumes,
};
