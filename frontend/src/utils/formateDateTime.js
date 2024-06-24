export const SimpleDateMonthDay = (date) => {
	return new Date(date)
		.toDateString()
		.split(" ")
		.slice(0, 3)
		.reverse()
		.join("-");
};
export const SimpleTime = (time) => {
	const date = new Date(time);
	let hours = date.getHours();
	const minutes = date.getMinutes();
	const ampm = hours >= 12 ? "PM" : "AM";
	hours = hours % 12;
	hours = hours ? hours : 12;
	const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
	const strTime = `${hours}:${minutesStr} ${ampm}`;
	return strTime;
};
export const SimpleDateAndTime = (dateTime) => {
	return (
		new Date(dateTime)
			.toDateString()
			.split(" ")
			.slice(1, 3)
			.reverse()
			.join("-") +
		"-" +
		new Date(dateTime).toDateString().split(" ").slice(-1) +
		" " +
		SimpleTime(dateTime)
	);
};
