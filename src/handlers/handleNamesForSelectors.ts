import { Flight } from '@interfaces/Flight';

export function getAllNames(data: Flight[], value: keyof Flight): string[] {
  const names: string[] = [];

  data.forEach((flight) => {
    const val = String(flight[value]);

    if (!names.includes(String(flight[value]))) {
      names.push(val);
    }
  });

  return names.sort((a, b) => a.localeCompare(b));
}
