import {
  differenceInCalendarDays,
  format,
  formatDistanceToNowStrict,
  isAfter,
  isBefore,
  isToday,
  parseISO,
} from "date-fns";

export function formatShortDate(value: string | null) {
  if (!value) {
    return "No date";
  }

  return format(parseISO(value), "MMM d");
}

export function formatDateTime(value: string | null) {
  if (!value) {
    return "No date";
  }

  return format(parseISO(value), "MMM d, h:mm a");
}

export function isOverdue(value: string | null) {
  if (!value) {
    return false;
  }

  const date = parseISO(value);
  return isBefore(date, new Date()) && !isToday(date);
}

export function isDueSoon(value: string | null, days = 3) {
  if (!value || isOverdue(value)) {
    return false;
  }

  const date = parseISO(value);
  const distance = differenceInCalendarDays(date, new Date());
  return distance >= 0 && distance <= days;
}

export function isExpired(value: string | null) {
  if (!value) {
    return false;
  }

  return isBefore(parseISO(value), new Date());
}

export function isNotifyWindow(value: string | null) {
  if (!value) {
    return false;
  }

  const date = parseISO(value);
  return isBefore(date, new Date()) || isToday(date);
}

export function timeLeft(value: string | null) {
  if (!value) {
    return "No expiration";
  }

  const date = parseISO(value);
  if (isAfter(new Date(), date)) {
    return "Expired";
  }

  return `${formatDistanceToNowStrict(date)} left`;
}

export function toDateTimeLocalValue(value: string | null) {
  if (!value) {
    return "";
  }

  return format(parseISO(value), "yyyy-MM-dd'T'HH:mm");
}

export function fromDateTimeLocalValue(value: string) {
  return value ? new Date(value).toISOString() : null;
}
