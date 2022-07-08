import { compare as bcryptCompare } from "bcrypt";

export const compare = (rawValue: string, encryptedValue: string) =>
	bcryptCompare(rawValue, encryptedValue);
