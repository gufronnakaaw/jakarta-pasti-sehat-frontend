const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

export function formatDate(dateProp: string) {
  const date = new Date(dateProp);
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

  return `${day} ${months[month]} ${year} ${hours}:${minutes}`;
}

export function formatDateWithoutTime(dateProp: string) {
  const date = new Date(dateProp);
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${day} ${months[month]} ${year}`;
}

export function formatDayWithoutTime(date: Date) {
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${days[date.getDay()]}, ${day} ${months[month]} ${year}`;
}

export function formatEventDate(start: string, end: string): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  const startDate = new Date(start).toLocaleDateString("id-ID", options);
  const endDate = new Date(end).toLocaleDateString("id-ID", options);

  return startDate === endDate
    ? startDate
    : startDate.split(" ")[1] === endDate.split(" ")[1] &&
        startDate.split(" ")[2] === endDate.split(" ")[2]
      ? `${startDate.split(" ")[0]} - ${endDate.split(" ")[0]} ${startDate.split(" ")[1]} ${startDate.split(" ")[2]}`
      : `${startDate} - ${endDate}`;
}

export function formatEventTime(start: string, end: string): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const startTime = new Date(start).toLocaleTimeString("id-ID", options);
  const endTime = new Date(end).toLocaleTimeString("id-ID", options);

  return `${startTime} - ${endTime} WIB`;
}
