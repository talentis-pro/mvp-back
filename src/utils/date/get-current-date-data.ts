/* eslint-disable @typescript-eslint/no-magic-numbers */
import { date } from ".";
import { getWeekOfMonth } from "./get-week";

const formatDate = (dateInstance: number) =>
	String(dateInstance).padStart(2, "0");

export const getCurrentDateData = () => {
	const currentDate = date();

	const year = currentDate.year();
	const month = formatDate(currentDate.month() + 1);
	const week = getWeekOfMonth({ date: currentDate });
	const day = formatDate(currentDate.date());

	return {
		currentDate,
		year,
		month,
		week,
		day,
	};
};
