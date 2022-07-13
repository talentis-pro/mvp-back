/* eslint-disable @typescript-eslint/no-invalid-this */

import type { Yup } from "..";

export const startsWith = (yup: Yup) => {
	yup.addMethod(yup.string, "startsWith", function (text: string) {
		return this.test({
			name: "startsWith",
			message: `\${path} must starts with ${text}`,
			test: value => (value ? value.startsWith(text) : true),
		});
	});
};
