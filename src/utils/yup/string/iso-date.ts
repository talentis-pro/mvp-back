/* eslint-disable @typescript-eslint/no-invalid-this */

import { isIsoDate } from "@techmmunity/utils";

import type { Yup } from "..";

export const isoDate = (yup: Yup) => {
	yup.addMethod(yup.string, "isoDate", function () {
		return this.test({
			name: "isoDate",
			message: "${path} must be a valid ISO date",
			test: value => (value ? isIsoDate(value) : true),
		});
	});
};
