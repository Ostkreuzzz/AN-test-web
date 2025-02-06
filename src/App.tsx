import FlightCard from '@components/FlightCard';
import { Flight } from '@interfaces/Flight';
import { getAllFlights } from 'api/fligts';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import LoadingCircular from '@components/LoadingCircle';
import PaginationControlled from '@components/PaginationControlled';
import Navigation from '@components/Navigation';
import Selector from '@components/Selector';
import Search from '@components/Search';
// import RangeSlider from '@components/Slider';
import { getAllNames } from 'handlers/handleNamesForSelectors';
import { getFilteredData } from 'handlers/filterData';
import { getPaginationRange } from 'handlers/paginationRange';

function App() {
  const [data, setData] = useState<Flight[]>([]);
  const [visibleData, setVisibleData] = useState<Flight[]>([]);

  const [query, setQuery] = useState('');
  const [airline, setAirline] = useState('');
  const [terminal, setTerminal] = useState('');
  // const [priceRange, setPriceRange] = useState([0, 1000]);
  // const [date, setDate] = useState({ start: '', end: '' });
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({
    type: '',
    isMessage: false,
  });

  const airlines = getAllNames(data, 'airline');
  const terminals = getAllNames(data, 'terminal');
  const sortedData = getFilteredData({ data, query, airline, terminal });
  const itemsPerPage = 15;

  const fetchAllFlights = useCallback(async () => {
    setIsLoading(true);
    const res = await getAllFlights();
    setData(res);

    setIsLoading(false);
  }, []);

  useEffect(() => {
    setVisibleData(getPaginationRange(sortedData, page, itemsPerPage));
  }, [page, sortedData]);

  useEffect(() => {
    fetchAllFlights();
  }, [fetchAllFlights]);

  return (
    <div>
      <div
        className=' flex flex-col items-center justify-between gap-24
            desktop:flex-row desktop:items-start  desktop:justify-start desktop:gap-0 desktop:py-32'
      >
        <div className='desktop:pl-32'>
          <Navigation />
        </div>

        <div className='flex w-full flex-col gap-40 px-16 desktop:px-32 desktop:pt-18'>
          {message.isMessage && (
            <Snackbar
              open={message.isMessage}
              autoHideDuration={3000}
              onClose={() =>
                setMessage({
                  type: '',
                  isMessage: false,
                })
              }
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Alert
                onClose={() =>
                  setMessage({
                    type: '',
                    isMessage: false,
                  })
                }
                severity='error'
                sx={{ width: '100%' }}
              >
                {message.type}
              </Alert>
            </Snackbar>
          )}
          <main className='flex flex-col items-start justify-between gap-32 desktop:flex-row desktop:items-center'>
            <Search query={query} setQuery={setQuery} />
            {/* <RangeSlider value={priceRange} setValue={setPriceRange} /> */}
            <div className='flex w-full gap-16'>
              <Selector title='Airline' value={airline} setValue={setAirline} items={airlines} />
              <Selector title='Terminal' value={terminal} setValue={setTerminal} items={terminals} />
            </div>
          </main>
          {isLoading ? (
            <LoadingCircular />
          ) : visibleData.length > 0 ? (
            <main
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
            </main>
          ) : (
            <p className='text-center  text-xl text-black'>
              No suitable data found. Please adjust your filters or search query.
            </p>
          )}

          {sortedData.length > itemsPerPage && (
            <div className='flex justify-center'>
              <PaginationControlled
                amount={Math.ceil(sortedData.length / itemsPerPage)}
                page={page}
                setPage={setPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
