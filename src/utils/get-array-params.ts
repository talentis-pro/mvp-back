export const getArrayParams = (
	params: Record<string, Array<string> | string>,
) => {
	const entriesArray = Object.entries(params).map(([key, val]) => {
		if (["limit", "offset"].includes(key) || Array.isArray(val)) {
			return [key, val];
		}

		return [key, [val]];
	});

	return Object.fromEntries(entriesArray);
};
