/* eslint-disable @typescript-eslint/no-magic-numbers */

import { makeValidate } from "utils/validate";
import { yup } from "utils/yup";

import { name, resumeId, userId } from "../validations/resume";

import type { ServiceParams } from "./service";

export const resumeSchema = yup.object().strict().shape({
	userId: userId.required(),
	resumeId: resumeId.required(),
	name: name.required(),
});

export const validate = makeValidate<ServiceParams>(resumeSchema);
