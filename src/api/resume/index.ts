import { createResume } from "./create-resume/handler";
import { deleteResume } from "./delete-resume/handler";
import { editResumeName } from "./edit-resume-name/handler";
import { editResume } from "./edit-resume/handler";
import { triggerGenerateWorkflow } from "./generate-resume-workflow/trigger-generate-workflow/handler";
import { updateResumeStatus } from "./generate-resume-workflow/update-resume-status/handler";
import { getUserResumes } from "./get-user-resumes/handler";

export const resumeDomain = {
	resumeDomainCreateResume: createResume,
	resumeDomainDeleteResume: deleteResume,
	resumeDomainEditResumeName: editResumeName,
	resumeDomainEditResume: editResume,
	resumeDomainTriggerGenerateWorkflow: triggerGenerateWorkflow,
	resumeDomainGetUserResumes: getUserResumes,
	grUpdateResumeStatus: updateResumeStatus,
};
