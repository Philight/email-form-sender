const DATE_DELIMITER = '-';

const getDateTime = (date_ob: Date): Date => {
	var day = ("0" + date_ob.getDate()).slice(-2);
	var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
	var year = date_ob.getFullYear();
	var hours = date_ob.getHours();
	let minutes = date_ob.getMinutes();
	let seconds = date_ob.getSeconds();

	return day + DATE_DELIMITER + month + DATE_DELIMITER + year + ' ' + hours + ':' + minutes + ':' + seconds;
}

const elapsedTime = (date1, date2): string => {
	var diff = date2 - date1;

	var diffHours = parseInt(diff / (1000 * 60 * 60), 10); 
  diff = diff - (diffHours * 1000 * 60 * 60);
	var diffMinutes = parseInt(diff / (1000 * 60), 10); 
  diff = diff - (diffMinutes * 1000 * 60);
	var diffSeconds = parseInt(diff / 1000, 10); 

	if (diffHours.length < 2) {
		diffHours = "0" + diffHours;
	}
	if (diffMinutes.length < 2) {
		diffMinutes = "0" + diffMinutes;
	}
	if (diffSeconds.length < 2) {
		diffSeconds = "0" + diffSeconds;
	}
	
	return `${diffHours}:${diffMinutes}:${diffSeconds}`;
}

const formattedDate = (dateObj: Date): Date => {
	var day = ("0" + dateObj.getDate()).slice(-2);
	var month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
	var year = dateObj.getFullYear();
	return day + DATE_DELIMITER + month + DATE_DELIMITER + year;
}

const getNumericMonth = (monthString): number => {
	if (monthString == '' || monthString == null) return null;
	
	switch (true) {
		case monthString.toLowerCase().includes('led'):
			return 1;		
		case monthString.toLowerCase().includes('únor'):
			return 2;
		case monthString.toLowerCase().includes('břez'):
			return 3;		
		case monthString.toLowerCase().includes('dub'):
			return 4;		
		case monthString.toLowerCase().includes('květ'):
			return 5;		
		case monthString.toLowerCase().includes('června'):
			return 6;
		case monthString.toLowerCase().includes('července'):
			return 7;		
		case monthString.toLowerCase().includes('srp'):
			return 8;		
		case monthString.toLowerCase().includes('zář'):
			return 9;		
		case monthString.toLowerCase().includes('říj'):
			return 10;
		case monthString.toLowerCase().includes('list'):
			return 11;		
		case monthString.toLowerCase().includes('pros'):
			return 12;									
	}
}

const daysBetween = (startDate, endDate): number => {
  // The number of milliseconds in all UTC days (no DST)
  const oneDay = 1000 * 60 * 60 * 24;

  // A day in UTC always lasts 24 hours (unlike in other time formats)
  const start = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  const end = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());

  // so it's safe to divide by 24 hours
  return (start - end) / oneDay;
}

module.exports = {
	getDateTime,
	elapsedTime,
	formattedDate,
	getNumericMonth,
	daysBetween
}