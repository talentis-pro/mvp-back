/* eslint-disable @typescript-eslint/no-magic-numbers */

import type { Dayjs } from "dayjs";

import { date } from ".";

interface GetWeekOfMonthParams {
	date?: Dayjs;
}

/**
 * https://stackoverflow.com/a/9608670
 */
export const getWeekOfMonth = ({
	date: dateInstance = date(),
}: GetWeekOfMonthParams) => {
	const dayOfTheWeekOfTheFirstDayOfTheMonth = dateInstance
		.clone()
		.set("day", 0)
		.day();

	const lastDayOfMonth = dateInstance.daysInMonth();

	const offsetDate =
		dateInstance.date() + dayOfTheWeekOfTheFirstDayOfTheMonth - 1;

	const index = 1; // Start index at 0 or 1, your choice

	const weeksInMonth =
		index +
		Math.ceil((lastDayOfMonth + dayOfTheWeekOfTheFirstDayOfTheMonth - 7) / 7);

	const week = index + Math.floor(offsetDate / 7);

	if (week < 2 + index) return week;

	return week === weeksInMonth ? index + 5 : week;
};
