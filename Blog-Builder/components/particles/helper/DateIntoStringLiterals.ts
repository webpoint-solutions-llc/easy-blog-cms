import moment from 'moment';

export const strIntoDateLiteral = (date: Date) => {
  // Get today's date
  const today = new Date();

  // Get yesterday's date
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Check if the dates are today or yesterday and convert to desired format
  let dateStr;

  if (date.toDateString() === today.toDateString()) {
    dateStr = 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    dateStr = 'Yesterday';
  } else {
    dateStr = moment(date.toLocaleString()).format('YYYY-MM-DD');
  }

  return dateStr;
};
