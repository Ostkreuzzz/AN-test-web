import { Flight } from '@interfaces/Flight';

interface Props {
  data: Flight[];
  query: string;
  terminal: string;
  airline: string;
  // priceRange: number[];
}

export function getFilteredData({ data, query, terminal, airline }: Props) {
  let visibleData = [...data];

  if (query) {
    visibleData = visibleData.filter(
      (flight) => flight.to.includes(query.toUpperCase()) || flight.from.includes(query.toUpperCase()),
    );
  }

  if (terminal) {
    visibleData = visibleData.filter((flight) => flight.terminal === terminal);
  }

  if (airline) {
    visibleData = visibleData.filter((flight) => flight.airline === airline);
  }

  // if (priceRange) {
  //   visibleData = visibleData.filter((flight) => flight.price >= priceRange[0] && flight.price <= priceRange[1]);
  // }

  return visibleData;
}
