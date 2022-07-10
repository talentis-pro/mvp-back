import { migration1657471901815 } from "./1657471901815-Create-Users-Table";
import { migration1657472036051 } from "./1657472036051-Create-VerificationTokens-Table";
import { migration1657472138871 } from "./1657472138871-Create-RefreshTokens-Table";

interface Migration {
	name: string;
	up: string;
}

export const getCode = (name: string) => parseInt(name.split("-").shift()!, 10);

export const migrations: Array<Migration> = [
	migration1657471901815,
	migration1657472036051,
	migration1657472138871,
].sort((a, b) => getCode(a.name) - getCode(b.name));
