const name = "1657472036051-Create-VerificationTokens-Table";

const up = `CREATE TABLE IF NOT EXISTS verification_tokens(
	"token" VARCHAR NOT NULL,
	"userId" VARCHAR NOT NULL,
	"createdAt" timestamptz DEFAULT CURRENT_TIMESTAMP,

	PRIMARY KEY ("token", "userId"),

	FOREIGN KEY ("userId") REFERENCES users ("id") ON DELETE CASCADE
);`;

export const migration1657472036051 = {
	name,
	up,
};
