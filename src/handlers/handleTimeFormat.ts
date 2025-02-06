import dayjs from 'dayjs';

export function formatDateTime(isoString: string) {
  return dayjs(isoString).format('ddd, MMM DD, YYYY hh:mm A');
}
