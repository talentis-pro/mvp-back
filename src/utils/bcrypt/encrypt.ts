import { hash } from "bcrypt";

const SAFE_SALTS = 10;

export const encrypt = (password: string) => hash(password, SAFE_SALTS);
