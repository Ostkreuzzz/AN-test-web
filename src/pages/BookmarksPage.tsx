import { useCallback, useEffect, useState } from 'react';

import { Typography, Container } from '@mui/material';

import { Flight } from '@interfaces/Flight';

import LoadingCircular from '@components/LoadingCircle';
import FlightCard from '@components/FlightCard';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';

import { setMessage } from 'store/slices/messageReducer';
import { getFlightById } from 'api/fligts';
import BasicButton from '@components/Button';
import { deleteAll } from 'store/slices/bookmarkReducer';

function BookmarksPage() {
  const [data, setData] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const bookmarkIds = useSelector((state: RootState) => state.bookmarkStore.value);

  function handleClearAll() {
    dispatch(deleteAll());
  }

  const fetchBookmarkedFlights = useCallback(async () => {
    setIsLoading(true);
    try {
      const flights = await Promise.all(bookmarkIds.map((id) => getFlightById(id)));
      setData(flights.map((res) => res.data as Flight));
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
  }, [dispatch, bookmarkIds]);

  useEffect(() => {
    fetchBookmarkedFlights();
  }, [fetchBookmarkedFlights]);

  if (!bookmarkIds.length) {
    return (
      <Container maxWidth='md' sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant='h5'>No bookmarks</Typography>
      </Container>
    );
  }

  if (isLoading) {
    return <LoadingCircular />;
  }

  return (
    <div className='flex w-full flex-col gap-32 px-16 desktop:px-32 desktop:pt-18'>
      {bookmarkIds.length > 0 && (
        <div className='flex flex-col items-start justify-between gap-32 desktop:flex-row desktop:items-center'>
          <BasicButton title='Clear All' handleClick={handleClearAll} isDisabled={!bookmarkIds.length} />
        </div>
      )}

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
    </div>
  );
}

export default BookmarksPage;
