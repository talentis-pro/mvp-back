const name = "1657472947912-Create-Months-Table";

const up = `CREATE TABLE IF NOT EXISTS months(
	"language" languages_enum NOT NULL,
	"january" VARCHAR NOT NULL,
	"february" VARCHAR NOT NULL,
	"march" VARCHAR NOT NULL,
	"april" VARCHAR NOT NULL,
	"may" VARCHAR NOT NULL,
	"june" VARCHAR NOT NULL,
	"july" VARCHAR NOT NULL,
	"august" VARCHAR NOT NULL,
	"september" VARCHAR NOT NULL,
	"october" VARCHAR NOT NULL,
	"november" VARCHAR NOT NULL,
	"december" VARCHAR NOT NULL,

	PRIMARY KEY ("language")
);`;

export const migration1657472947912 = {
	name,
	up,
};
