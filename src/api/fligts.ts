import { client } from './httpClient';

export async function getAllFlights() {
  return client.get('flights');
}

export async function getFlightById(id: number) {
  return client.get(`flights/${id}`);
  // try {
  //   const res = await client.get(`flights/${id}`);
  //   return res.data as Flight;
  // } catch (e) {
  //   return [];
  // }
}
