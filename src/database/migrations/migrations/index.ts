import { migration1657471901815 } from "./1657471901815-Create-Users-Table";
import { migration1657472036051 } from "./1657472036051-Create-VerificationTokens-Table";
import { migration1657472138871 } from "./1657472138871-Create-RefreshTokens-Table";
import { migration1657472436740 } from "./1657472436740-Create-Languages-Enum";
import { migration1657472436741 } from "./1657472436741-Create-ResumeTemplates-Table";
import { migration1657472947911 } from "./1657472947911-Create-PhrasesToFill-Table";
import { migration1657472947912 } from "./1657472947912-Create-Months-Table";

interface Migration {
	name: string;
	up: string;
}

export const getCode = (name: string) => parseInt(name.split("-").shift()!, 10);

export const migrations: Array<Migration> = [
	migration1657471901815,
	migration1657472036051,
	migration1657472138871,
	migration1657472436740,
	migration1657472436741,
	migration1657472947911,
	migration1657472947912,
].sort((a, b) => getCode(a.name) - getCode(b.name));
