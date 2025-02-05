import { Flight } from '@interfaces/Flight';
import { client } from './httpClient';

export async function getAllFlights(): Promise<Flight[]> {
  try {
    const res = await client.get('flights');
    return res.data as Flight[];
  } catch (e) {
    return [];
  }
}

export async function getFlightById(id: number) {
  try {
    const res = await client.get(`flights/${id}`);
    return res.data as Flight;
  } catch (e) {
    return [];
  }
}
