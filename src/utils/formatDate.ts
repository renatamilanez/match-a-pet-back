const WEEKDAYS = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

function formatDateWithWeekday(date: Date) {
  const dayIndex = Number(date.getDay());
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const year = String(date.getUTCFullYear());
  const dateString = `${WEEKDAYS[dayIndex]}, ${year}/${month}/${day}`;
  return dateString;
}

function formatDate(date: Date) {
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const year = String(date.getUTCFullYear());
  const dateString = `${year}/${month}/${day}`;
  return dateString;
}

function formatTime(date: Date) {
  const hour = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const dateString = `${hour}:${minutes}`;
  return dateString;
}

export { formatDateWithWeekday, formatDate, formatTime };
