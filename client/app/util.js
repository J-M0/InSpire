/**
 * @params time must be castable to Date object 
 * toLocaleTimeString does basic filtering of extraneous
 * information such as timezone and date
 * substring truncates the information past the minutes
 * replace removes leading 0s just in case
 **/
export default function timeToString(time) { 
	if (typeof time !== "Date") {
		time = new Date(time).toLocaleTimeString();
	} else {
		time = time.toLocaleTimeString();
	}
	return time.substring(0, time.indexOf(":")+3).replace(/^0+/, ''); 
}
