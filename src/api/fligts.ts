import { client } from './httpClient';

export async function getAllFlights() {
  return client.get('flights');
}

export async function getFlightById(id: string) {
  return client.get(`flights/${id}`);
}
