// date.getMonth() gets months from index 0
const monthConverter = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec"
};

export const dateFormatter = dateString => {
  const date = new Date(dateString);
  return `${date.getDate()} ${
    monthConverter[date.getMonth()]
  } ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
};
