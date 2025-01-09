export type DateFormat = "DD/MM/YYYY" | "YYYY-MM-DD";

const BR_DATE_REGEX = /^([0-9]{1,2})\/?([0-9]{1,2})?\/?([0-9]{1,5})?$/;
const BR_DATE_END_REGEX = /(\d{4})\d+?$/;
const EN_DATE_REGEX = /^(\d{1,4})?-?(\d{1,2})?-?(\d{1,3})/;
const EN_DATE_END_REGEX = /(\d{2})\d+?$/;

/**
 * Formats a date to a type from a date that follows the EN (YYYY-MM-DD) or BR (DD/MM/YYYY) date formats
 * @param {string} date the date you want to be formatted
 * @param {DateFormat} format the format that you want to format the provided date
 * @example
 * formatDate('1968-07-25', 'DD/MM/YYYY') // 25/07/1968
 * formatDate('25/07/1968', 'YYYY-MM-DD') // 1968-07-25
 */
export function formatDate(
	date: string | undefined,
	format: DateFormat = "DD/MM/YYYY"
): string {
	let splittedDate = splitDateNumbers(date);
	if (!splittedDate.length) return "";
	let [day, month, year] = splittedDate;
	return formatDateByType(day, month, year, format);
}

function formatDateByType(
	day: string,
	month: string,
	year: string,
	type: DateFormat
) {
	switch (type) {
		case "DD/MM/YYYY":
			if (year) return `${day}/${month}/${year}`;
			if (month) return `${day}/${month}`;
			return `${day}`;
		case "YYYY-MM-DD":
			if (!month.length) return `${day}`;
			if (!year.length) return `${month}-${day}`;
			return `${year}-${month}-${day}`;
	}
}

/**
 * Formats a date to a type from a date object
 * @param {Date} date the date you want to be formatted
 * @param {DateFormat} format the format that you want to format the provided date
 * @example
 * formatDate(new Date('1968-07-25'), 'DD/MM/YYYY') // 25/07/1968
 * formatDate(new Date('25/07/1968'), 'YYYY-MM-DD') // 1968-07-25
 */
export function formatDateByObject(date: Date, format: DateFormat) {
	let day = date.getDate().toString();
	if (Number(day) < 10) day = `0${day}`;
	let month = (date.getMonth() + 1).toString();
	if (Number(month) < 10) month = `0${month}`;
	const year = date.getFullYear().toString();
	return formatDateByType(day, month, year, format);
}

/**
 * Calculates age based on a provided date.
 * @param date source or birth date
 * @example
 * // thinking we're in 2022
 * calculateAgeByDate('2000-01-01') // 22
 */
export function calculateAgeByDate(date: string | undefined): number {
	if (!date || !date.length) return 0;
	const splittedDate = splitDateNumbers(date);
	if (!splittedDate.length) return 0;
	const [day, month, year] = splittedDate;
	const birthDate = new Date(`${year}-${month}-${day}`);
	const dateDiff = new Date(new Date().getTime() - birthDate.getTime());
	return dateDiff.getFullYear() - 1970;
}

/**
 * Returns the day, month and year of a date respectively, doesn't matter the format of the date (BR or EN).
 * If the date doesn't match with the BR or EN date formats, it returns an empty array
 * @param {string} date - a date in format YYYY-MM-DD or DD/MM/YYYY
 * @example
 * splitDateNumbers('1968-07-25'); // [25, 07, 1968]
 */
function splitDateNumbers(date: string = ""): [string, string, string] | [] {
	let match: RegExpMatchArray | null = date.match(BR_DATE_REGEX);
	let day: string = "",
		month: string = "",
		year: string = "";
	if (match !== null) {
		[day, month, year] = [
			match[1],
			match[2],
			match[3]?.replace(BR_DATE_END_REGEX, "$1"),
		];
	} else {
		match = date.match(EN_DATE_REGEX);
		if (!match) return ["", "", ""];
		[day, month, year] = [
			match[3]?.replace(EN_DATE_END_REGEX, "$1"),
			match[2],
			match[1],
		];
	}
	if (day) day = day.substring(0, 2);
	if (month) month = month.substring(0, 2);
	if (year) year = year.substring(0, 4);
	return [day ?? "", month ?? "", year ?? ""];
}

export function formatDateWithTimeToView(timestamp?: string) {
	if (!timestamp) return;
	let date: string | undefined = undefined;
	const timestampSplit = timestamp.split("T");
	if (timestamp.includes("T")) date = timestampSplit[0];
	if (!date) return;

	let day = date.split("-")[2];
	let month = date.split("-")[1];
	const year = date.split("-")[0];

	if (Number(day) < 10) {
		day = `0${Number(day)}`;
	}

	if (Number(month) < 10) {
		month = `0${Number(month)}`;
	}

	const formattedDate = `${day}/${month}/${year}`;
	const time = timestampSplit[1].split("-")[0];

	return `${formattedDate} às ${time}`;
}