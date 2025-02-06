import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Flight } from '@interfaces/Flight';
import { Card, CardContent, Typography, Box, Container, Paper, Stack, Divider } from '@mui/material';
import { FlightTakeoff, FlightLand, AirplaneTicket, Place } from '@mui/icons-material';
import { getFlightById } from 'api/fligts';
import { setMessage } from 'store/slices/messageReducer';
import { useDispatch } from 'react-redux';
import LoadingCircular from '@components/LoadingCircle';
import { formatDateTime } from 'handlers/handleTimeFormat';
import ChairIcon from '@mui/icons-material/Chair';

export default function FlightDetailsPage() {
  const dispatch = useDispatch();
  const { flightId } = useParams();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [seats, setSeats] = useState<boolean[][]>([]);

  const generateSeats = (rows: number, cols: number) => {
    const newSeats = Array.from(
      { length: rows },
      () => Array.from({ length: cols }, () => Math.random() < 0.3), // 30% occupancy rate
    );
    setSeats(newSeats);
  };

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const response = await getFlightById(flightId!);
        setFlight(response.data as Flight);
        generateSeats(8, 6);
      } catch (error) {
        dispatch(
          setMessage({
            text: `Can't load data: ${error as string} `,
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
    <Container maxWidth='lg' sx={{ mt: 4 }}>
      <Stack spacing={4} direction={{ xs: 'column', md: 'row' }}>
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3, flex: 2 }}>
          <Typography variant='h3' align='center' gutterBottom>
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
            {seats.map((row, rowIndex) => (
              <Stack key={rowIndex} direction='row' spacing={1}>
                {row.map((occupied, colIndex) => (
                  <Card
                    key={colIndex}
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
                    <CardContent>
                      <ChairIcon />
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            ))}
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
