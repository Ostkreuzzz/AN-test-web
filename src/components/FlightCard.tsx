import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Flight } from '@interfaces/Flight';

export default function FlightCard({ airline, from, to, departureTime, arrivalTime, terminal, gate, tickets }: Flight) {
  return (
    <Card sx={{ maxWidth: 400, fontFamily: 'inherit' }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            Airline: {airline}
          </Typography>
          <Typography gutterBottom variant='h5' component='div'>
            From: {from} To: {to}
          </Typography>
          <Typography gutterBottom variant='h5' component='div'>
            Departure Time: {departureTime} Arrival Time: {arrivalTime}
          </Typography>

          <Typography gutterBottom variant='h5' component='div'>
            Terminal: {terminal}
          </Typography>

          <Typography variant='h5' component='div'>
            Gate: {gate}
          </Typography>

          <Typography variant='h5' component='div'>
            Tickets Total: {tickets.total} Tickets Remaning: {tickets.remaining}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
