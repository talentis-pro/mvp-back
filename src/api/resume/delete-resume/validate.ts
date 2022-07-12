/* eslint-disable @typescript-eslint/no-magic-numbers */

import { makeValidate } from "utils/validate";
import { yup } from "utils/yup";

import type { ServiceParams } from "./service";

const schema = yup.object().strict().shape({
	userId: yup.string().strict().required().uuid(),
	resumeId: yup.string().strict().required().uuid(),
});

export const validate = makeValidate<ServiceParams>(schema);
