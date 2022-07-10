const name = "1657471901815-Create-Users-Table";

const up = `CREATE TABLE IF NOT EXISTS users(
	"id" UUID NOT NULL,
	"email" VARCHAR NOT NULL,
	"password" VARCHAR NOT NULL,
	"verified" BOOLEAN NOT NULL DEFAULT FALSE,
	"createdAt" timestamptz DEFAULT CURRENT_TIMESTAMP,

	PRIMARY KEY ("id")
);`;

export const migration1657471901815 = {
	name,
	up,
};
