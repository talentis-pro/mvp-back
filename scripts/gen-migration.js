const { writeFileSync } = require("fs");

const date = Date.now();
const migrationCode = `${date}-Migration-Name-Here`;

const migrationFile = `const name = "${migrationCode}";

const up = "";

export const migration${date} = {
	name,
	up,
};
`;

writeFileSync(
	`${process.cwd()}/src/database/migrations/migrations/${migrationCode}.ts`,
	migrationFile,
);

console.log();
console.log();
console.log(
	"\x1b[32m%s\x1b[0m",
	`Successfully created migration: ${migrationCode}.ts`,
);
