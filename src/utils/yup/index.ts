/**
 *
 * Every Time that a function be added here,
 * you need to add the type to
 * the types/yup.d.ts file
 *
 */

import * as yup from "yup";

import { isoDate } from "./string/iso-date";
import { startsWith } from "./string/starts-with";

isoDate(yup);
startsWith(yup);

export { yup };

export type Yup = typeof yup;
