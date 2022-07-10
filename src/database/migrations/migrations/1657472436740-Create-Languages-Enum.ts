/**
 *
 *
 * https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
 *
 *
 */

const name = "1657472436740-Create-Languages-Type";

const up = `CREATE TYPE languages_enum AS ENUM ('EN', 'PT_BR', 'ES');`;

export const migration1657472436740 = {
	name,
	up,
};
