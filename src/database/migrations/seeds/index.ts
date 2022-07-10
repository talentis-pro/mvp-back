interface Seed {
	name: string;
	up: string;
}

const getCode = (name: string) => parseInt(name.split("-").shift()!, 10);

export const seeds: Array<Seed> = ([] as Array<Seed>).sort(
	(a, b) => getCode(a.name) - getCode(b.name),
);
