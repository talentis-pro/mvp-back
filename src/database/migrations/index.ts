/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable multiline-comment-style */

import { sleep } from "@techmmunity/utils";
import type { Client } from "pg";

import { getCode, migrations } from "./migrations";
import { seeds } from "./seeds";

import { getPostgreInstance } from "../../config/postgres";

const red = "\x1b[31m%s\x1b[0m";
const green = "\x1b[32m%s\x1b[0m";

const runMigrations = async (connection: Client) => {
	await connection.query(
		`CREATE TABLE IF NOT EXISTS migrations (
			code        varchar(100),
			PRIMARY KEY (code)
	);`,
	);

	const result = await connection.query(`SELECT * FROM migrations`);

	const alreadyExecutedMigrations = result.rows?.map(
		r => r.code,
	) as Array<string>;

	const notExecutedMigrations = migrations.filter(
		m => !alreadyExecutedMigrations.includes(m.name),
	);

	if (notExecutedMigrations.length === 0) {
		console.log(green, `No migrations to execute, everything is synced`);

		return;
	}

	console.log();
	console.log();
	console.log(green, "Migrations");
	console.log();
	console.log();

	for (const m of notExecutedMigrations) {
		try {
			await connection.query(m.up);

			await connection.query("INSERT INTO migrations (code) VALUES ($1)", [
				m.name,
			]);

			console.log(green, `Successfully executed migration: ${m.name}`);

			await sleep(0.5);
		} catch (err: any) {
			console.log();
			console.log();
			console.log(red, err.message);
			console.log();
			console.log();

			process.exit(1);
		}
	}
};

const runSeedsAndMigrations = async (connection: Client) => {
	const formatedMigrations = migrations.map(migration => ({
		...migration,
		type: "migration",
	}));

	const formatedSeed = seeds.map(seed => ({
		...seed,
		type: "seed",
	}));

	const migrationsAndSeeds = [...formatedMigrations, ...formatedSeed].sort(
		(a, b) => {
			return getCode(a.name) - getCode(b.name);
		},
	);

	await connection.query(
		`CREATE TABLE IF NOT EXISTS migrations (
			code        varchar(100),
			PRIMARY KEY (code)
		);
		CREATE TABLE IF NOT EXISTS seeds (
			code        varchar(100),
			PRIMARY KEY (code));`,
	);

	const result = await connection.query(
		`SELECT * FROM migrations UNION  SELECT * FROM seeds`,
	);

	const alreadyExecuted = result.rows?.map(r => r.code) as Array<string>;

	const notExecutedYet = migrationsAndSeeds.filter(
		m => !alreadyExecuted.includes(m.name),
	);

	if (notExecutedYet.length === 0) {
		console.log(
			green,
			`No migrations and seeds to execute, everything is synced`,
		);

		return;
	}

	console.log();
	console.log();
	console.log(green, "Migrations and Seeds");
	console.log();
	console.log();

	for (const ms of notExecutedYet) {
		try {
			await connection.query(ms.up);

			if (ms.type === "migration") {
				await connection.query("INSERT INTO migrations (code) VALUES ($1)", [
					ms.name,
				]);
				console.log(green, `Successfully executed migration: ${ms.name}`);
			} else {
				await connection.query("INSERT INTO seeds (code) VALUES ($1)", [
					ms.name,
				]);
				console.log(green, `Successfully executed seed: ${ms.name}`);
			}

			await sleep(0.5);
		} catch (err: any) {
			console.log();
			console.log();
			console.log(red, err.message);
			console.log();
			console.log();

			process.exit(1);
		}
	}
};

const genDb = async () => {
	const connection = await getPostgreInstance();

	if (process.env.NODE_ENV === "production") {
		await runMigrations(connection);
	} else {
		await runSeedsAndMigrations(connection);
	}

	process.exit(0);
};

genDb();
