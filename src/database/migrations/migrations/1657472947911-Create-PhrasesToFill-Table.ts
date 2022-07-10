const name = "1657472947911-Create-PhrasesToFill-Table";

const up = `CREATE TABLE IF NOT EXISTS phrases_to_fill(
	"language" languages_enum NOT NULL,
	"templateId" VARCHAR NOT NULL,
	"key" VARCHAR NOT NULL,
	"value" VARCHAR NOT NULL,

	PRIMARY KEY ("language", "templateId", "key"),

	FOREIGN KEY ("templateId") REFERENCES resume_templates ("id") ON DELETE CASCADE
);`;

export const migration1657472947911 = {
	name,
	up,
};
