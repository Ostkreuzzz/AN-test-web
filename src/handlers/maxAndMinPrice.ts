import { Flight } from '@interfaces/Flight';

export function getMinAndMaxPrice(data: Flight[]) {
  const prices = data.map((flight) => flight.price).sort((a, b) => b - a);

  return [prices[0], prices[prices.length]];
}
