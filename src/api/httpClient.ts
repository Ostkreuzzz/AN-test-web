import axios from 'axios';

const BASE_URL = 'https://679d13f487618946e6544ccc.mockapi.io/testove/v1/';

export const client = axios.create({
  baseURL: BASE_URL,
});
