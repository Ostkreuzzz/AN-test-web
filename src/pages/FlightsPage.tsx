import { useCallback, useEffect, useState } from 'react';

import { Flight } from '@interfaces/Flight';
import { getAllFlights } from 'api/fligts';

import PaginationControlled from '@components/PaginationControlled';
import LoadingCircular from '@components/LoadingCircle';
import FlightCard from '@components/FlightCard';
import Selector from '@components/Selector';
import Search from '@components/Search';

import { getAllNames } from 'handlers/handleNamesForSelectors';
import { getFilteredData } from 'handlers/filterData';
import { getPaginationRange } from 'handlers/paginationRange';
import { useDispatch } from 'react-redux';
import { setMessage } from 'store/slices/messageReducer';

function FlightsPage() {
  const [data, setData] = useState<Flight[]>([]);
  const [visibleData, setVisibleData] = useState<Flight[]>([]);

  const [query, setQuery] = useState('');
  const [airline, setAirline] = useState('');
  const [terminal, setTerminal] = useState('');

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const airlines = getAllNames(data, 'airline');
  const terminals = getAllNames(data, 'terminal');
  const sortedData = getFilteredData({ data, query, airline, terminal });
  const itemsPerPage = 15;

  const dispatch = useDispatch();

  const fetchAllFlights = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getAllFlights();
      setData(res.data as Flight[]);
    } catch (e) {
      dispatch(
        setMessage({
          type: 'error',
          text: `Failed to fatch the data: ${e as string}`,
          isMessage: true,
        }),
      );
    }

    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    setVisibleData(getPaginationRange(sortedData, page, itemsPerPage));
  }, [page, sortedData]);

  useEffect(() => {
    fetchAllFlights();
  }, [fetchAllFlights]);

  return (
    <div className='flex w-full flex-col gap-32 px-16 desktop:px-32 desktop:pt-18'>
      <div className='flex flex-col items-start justify-between gap-32 desktop:flex-row desktop:items-center'>
        <Search query={query} setQuery={setQuery} />
        <div className='flex w-full gap-16'>
          <Selector title='Airline' value={airline} setValue={setAirline} items={airlines} />
          <Selector title='Terminal' value={terminal} setValue={setTerminal} items={terminals} />
        </div>
      </div>
      {isLoading ? (
        <LoadingCircular />
      ) : visibleData.length > 0 ? (
        <div
          className='mx-auto my-0 grid grid-cols-1 gap-18 tablet:grid-cols-2 tablet-large:grid-cols-3 
      desktop:grid-cols-4 desktop-fullscreen:grid-cols-5 desktop-fullscreen:gap-12'
        >
          {visibleData.map((flightData) => (
            <FlightCard
              price={flightData.price}
              airline={flightData.airline}
              from={flightData.from}
              to={flightData.to}
              departureTime={flightData.departureTime}
              arrivalTime={flightData.arrivalTime}
              terminal={flightData.terminal}
              gate={flightData.gate}
              tickets={flightData.tickets}
              id={flightData.id}
              key={flightData.id}
            />
          ))}
        </div>
      ) : (
        <p className='text-center  text-xl text-black'>
          No suitable data found. Please adjust your filters or search query.
        </p>
      )}

      {sortedData.length > itemsPerPage && (
        <div className='flex justify-center'>
          <PaginationControlled amount={Math.ceil(sortedData.length / itemsPerPage)} page={page} setPage={setPage} />
        </div>
      )}
    </div>
  );
}

export default FlightsPage;
