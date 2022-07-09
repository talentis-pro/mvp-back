/* eslint-disable @typescript-eslint/no-magic-numbers */

import { makeValidate } from "utils/validate";
import { yup } from "utils/yup";

import type { ServiceParams } from "./service";

const schema = yup.object().strict().shape({
	email: yup.string().strict().required().email(),
	password: yup.string().strict().required(),
});

export const validate = makeValidate<ServiceParams>(schema);
