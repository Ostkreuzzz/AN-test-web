import { Flight } from '@interfaces/Flight';

export function getPaginationRange(data: Flight[], page: number, itemsPerPage: number) {
  if (page < 0) return [];
  return data.slice((page - 1) * itemsPerPage, page * itemsPerPage);
}
