const name = "1657472436741-Create-Templates-Table";

const up = `CREATE TYPE resume_templates_status_enum AS ENUM ('AVAILABLE', 'IN_PROGRESS', 'DEPRECATED');

CREATE TABLE IF NOT EXISTS resume_templates(
	"id" UUID NOT NULL,
	"name" VARCHAR NOT NULL,
	"description" VARCHAR NOT NULL,
	"previewImageUrl" VARCHAR NOT NULL,
	"status" resume_templates_status_enum NOT NULL,
	"availableLanguages" languages_enum[] NOT NULL,

	PRIMARY KEY ("id")
);`;

export const migration1657472436741 = {
	name,
	up,
};
