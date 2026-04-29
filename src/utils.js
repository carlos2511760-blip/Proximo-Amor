export const getMapsUrl = (location) => {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
};

export const getCalendarUrl = ({ title, description, location, startDate, endDate }) => {
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}&dates=${startDate}/${endDate}`;
};
