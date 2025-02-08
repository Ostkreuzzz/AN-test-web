import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Card, Typography, Box, Container, Paper, Stack, Divider, CardActionArea } from '@mui/material';
import { FlightTakeoff, FlightLand, AirplaneTicket, Place, Chair } from '@mui/icons-material';
import { Flight } from '@interfaces/Flight';
import { getFlightById } from 'api/fligts';

import { useDispatch } from 'react-redux';
import { setMessage } from 'store/slices/messageReducer';
import { addToCart } from 'store/slices/cartReducer';

import LoadingCircular from '@components/LoadingCircle';
import BasicButton from '@components/Button';

import { formatDateTime } from 'handlers/handleTimeFormat';
import { generateSeats } from 'handlers/generateSeats';

export default function FlightDetailsPage() {
  const dispatch = useDispatch();
  const { flightId } = useParams();
  const price = useRef(0);

  const [flight, setFlight] = useState<Flight | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [seats, setSeats] = useState<boolean[][]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [amountOfTickets, setAmountOfTickets] = useState(0);

  function handleTicketAdding(columnIndex: number, rowIndex: number) {
    setSeats((currSeats) => {
      const newSeats = currSeats.map((row) => [...row]);

      newSeats[columnIndex][rowIndex] = true;

      return newSeats;
    });

    setTotalPrice((curr) => curr + price.current);
    setAmountOfTickets((curr) => curr + 1);
  }

  function handleAddToCart() {
    dispatch(
      addToCart({
        flightId,
        amountOfTickets,
        ticketsValue: totalPrice,
      }),
    );
    dispatch(
      setMessage({
        text: `Tickets were succsessfully added!`,
        type: 'success',
        isMessage: true,
      }),
    );

    setTotalPrice(0);
    setAmountOfTickets(0);
  }

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const response = await getFlightById(flightId!);
        setFlight(response.data as Flight);
        price.current = response.data.price;

        generateSeats(8, 6, setSeats);
      } catch (error) {
        dispatch(
          setMessage({
            text: `Can't load data: ${error as string}`,
            type: 'error',
            isMessage: true,
          }),
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchFlight();
  }, [flightId, dispatch]);

  if (isLoading) {
    return <LoadingCircular />;
  }

  if (!flight) {
    return (
      <Typography variant='h5' align='center'>
        Flight not found.
      </Typography>
    );
  }

  return (
    <Container maxWidth='lg'>
      <Stack spacing={4} direction={{ xs: 'column', md: 'column' }}>
        <Stack spacing={4} direction={{ xs: 'column', md: 'row' }}>
          <Paper elevation={4} sx={{ p: 4, borderRadius: 3, flex: 2 }}>
            <Typography variant='h2' align='center' gutterBottom>
              Flight Details
            </Typography>
            <Typography variant='h5' align='center' color='primary' gutterBottom>
              {flight.airline}
            </Typography>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <Stack
                direction='row'
                spacing={2}
                alignItems='center'
                sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}
              >
                <Typography variant='h6' fontWeight='bold' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Place sx={{ color: 'secondary.main' }} />
                  From: {flight.from}
                </Typography>
                <Typography variant='h6' fontWeight='bold' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Place sx={{ color: 'secondary.main' }} />
                  To: {flight.to}
                </Typography>
              </Stack>

              <Divider sx={{ my: 1 }} />

              <Stack
                direction='row'
                spacing={2}
                alignItems='center'
                sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}
              >
                <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FlightTakeoff sx={{ color: 'info.main' }} />
                  {formatDateTime(flight.departureTime)}
                </Typography>
                <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FlightLand sx={{ color: 'success.main' }} />
                  {formatDateTime(flight.arrivalTime)}
                </Typography>
              </Stack>

              <Divider sx={{ my: 1 }} />

              <Stack direction='row' spacing={2} sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
                <Typography variant='h6'>
                  <strong>Terminal:</strong> {flight.terminal}
                </Typography>
                <Typography variant='h6'>
                  <strong>Gate:</strong> {flight.gate}
                </Typography>
              </Stack>
            </Stack>
            <Box
              mt={3}
              p={2}
              bgcolor='grey.100'
              borderRadius={2}
              sx={{ display: 'flex', alignItems: 'center', gap: 3, flexDirection: 'column ' }}
              textAlign='center'
            >
              <Typography variant='h4' color='primary'>
                Price: ${flight.price}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AirplaneTicket sx={{ color: 'warning.main' }} />
                <Typography variant='body2'>
                  <strong>Tickets:</strong> {flight.tickets.remaining}/{flight.tickets.total} remaining
                </Typography>
              </Box>
            </Box>
          </Paper>
          <Paper elevation={4} sx={{ p: 4, borderRadius: 3, flex: 1 }}>
            <Typography variant='h5' align='center' gutterBottom>
              Seating Plan
            </Typography>
            <Stack spacing={1} alignItems='center'>
              {seats.map((row, columnIndex) => (
                <Stack key={columnIndex} direction='row' spacing={1}>
                  {row.map((occupied, rowIndex) => (
                    <Card key={rowIndex}>
                      <CardActionArea
                        disabled={occupied}
                        onClick={() => handleTicketAdding(columnIndex, rowIndex)}
                        sx={{
                          width: 50,
                          height: 50,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: occupied ? 'error.main' : 'success.main',
                          borderRadius: 2,
                          color: 'white',
                          boxShadow: 3,
                        }}
                      >
                        <Chair />
                      </CardActionArea>
                    </Card>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Stack>
        <Paper elevation={4} sx={{ p: 2, borderRadius: 3, flex: 1 }}>
          <Typography variant='h5' align='center' gutterBottom>
            Tickets
          </Typography>
          <Box p={2} bgcolor='grey.100' borderRadius={2} sx={{ gap: 3, flexDirection: 'column ' }} textAlign='center'>
            <Typography variant='h6' color='primary'>
              Total Price: ${totalPrice}
            </Typography>
            <Divider sx={{ my: 1 }} />

            <Typography variant='h6' color='primary'>
              Amount of Tickets: {amountOfTickets}
            </Typography>

            <Divider sx={{ my: 1 }} />

            <BasicButton title='Add to Cart' isDisabled={!amountOfTickets} handleClick={handleAddToCart} />
          </Box>
        </Paper>
      </Stack>
    </Container>
  );
}
