import FlightCard from '@components/FlightCard';
import { Flight } from '@interfaces/Flight';
import { getAllFlights } from 'api/fligts';
import { useEffect, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import LoadingCircular from '@components/LoadingCircle';
import PaginationControlled from '@components/PaginationControlled';
import Navigation from '@components/Navigation';
import Selector from '@components/Selector';
import Search from '@components/Search';
import CustomizedSlider from '@components/Slider';

function App() {
  const [data, setData] = useState<Flight[]>([]);

  const [query, setQuery] = useState('');
  const [airline, setAirline] = useState('');
  const [terminal, setTerminal] = useState('');
  const [price, setPrice] = useState({ min: 30, max: 300 });
  // const [date, setDate] = useState({ start: '', end: '' });
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    type: '',
    isError: false,
  });

  const statusesTypes = ['Alive', 'Dead', 'unknown'];
  const gendersTypes = ['Male', 'Female', 'unknown'];

  async function fetchAllFlights() {
    setIsLoading(true);
    const res = await getAllFlights();
    setData(res);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchAllFlights();
  }, []);

  return (
    <body>
      <div
        className=' flex flex-col items-center justify-between gap-24
            desktop:flex-row desktop:items-start  desktop:justify-start desktop:gap-0 desktop:py-32'
      >
        <div className='desktop:pl-32'>
          <Navigation />
        </div>

        <div className='flex w-full flex-col gap-40 px-16 desktop:px-32 desktop:pt-18'>
          {error.isError && (
            <Snackbar
              open={error.isError}
              autoHideDuration={3000}
              onClose={() =>
                setError({
                  type: '',
                  isError: false,
                })
              }
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Alert
                onClose={() =>
                  setError({
                    type: '',
                    isError: true,
                  })
                }
                severity='error'
                sx={{ width: '100%' }}
              >
                {error.type}
              </Alert>
            </Snackbar>
          )}
          <div className='flex flex-col items-start justify-between gap-32 desktop:flex-row desktop:items-center'>
            <Search query={query} setQuery={setQuery} />
            <CustomizedSlider maxValue={300} minValue={30} />
            <div className='flex w-full gap-16'>
              <Selector title='Airline' value={airline} setValue={setAirline} items={gendersTypes} />
              <Selector title='Terminal' value={terminal} setValue={setTerminal} items={statusesTypes} />
            </div>
          </div>
          {isLoading ? (
            <LoadingCircular />
          ) : data.length > 0 ? (
            <div
              className='mx-auto my-0 grid grid-cols-1 gap-18 tablet:grid-cols-2 tablet-large:grid-cols-3 
      desktop:grid-cols-4 desktop-fullscreen:grid-cols-5 desktop-fullscreen:gap-12'
            >
              {data.map((flightData) => (
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
            <p className='text-gray text-center text-xl'>
              No suitable data found. Please adjust your filters or search query.
            </p>
          )}

          {data.length > 0 && (
            <div className='flex justify-center'>
              <PaginationControlled amount={data.length} page={page} setPage={setPage} />
            </div>
          )}
        </div>
      </div>
    </body>
  );
}

export default App;
