/* eslint-disable @typescript-eslint/no-magic-numbers */
import { dayjs } from ".";
import { getWeekOfMonth } from "./get-week";

const formatDate = (date: number) => String(date).padStart(2, "0");

export const getCurrentDateData = () => {
	const currentDate = dayjs();

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
