const aggregate = (arr, key1, key2) => {
	const result = arr.reduce((acc, curr) => {
		const key1Value = curr[key1];
		const key2Value = curr[key2];
		if (acc[key1Value]) {
			acc[key1Value] = {
				[key1]: key1Value,
				[key2]: [...acc[key1Value][key2], key2Value],
			};
		} else {
			acc[key1Value] = {
				[key1]: key1Value,
				[key2]: [key2Value],
			};
		}
		return acc;
	}, {});

	return Object.values(result);
};

const endorsements = [
	{ skill: "css", user: "Bill" },
	{ skill: "javascript", user: "Chad" },
	{ skill: "javascript", user: "Bill" },
	{ skill: "css", user: "Sue" },
	{ skill: "javascript", user: "Sue" },
	{ skill: "html", user: "Sue" },
];

console.log(aggregate(endorsements, "user", "skill"));
