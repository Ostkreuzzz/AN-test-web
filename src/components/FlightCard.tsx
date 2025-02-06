import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

import { Flight } from '@interfaces/Flight';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import PlaceIcon from '@mui/icons-material/Place';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { formatDateTime } from 'handlers/handleTimeFormat';

export default function FlightCard({ airline, from, to, departureTime, arrivalTime, terminal, gate, tickets }: Flight) {
  return (
    <Card sx={{ maxWidth: 400, borderRadius: 3, boxShadow: 3 }} className=' hover:scale-105 hover:border-light-blue'>
      <CardActionArea>
        <CardContent>
          <Typography variant='h6' fontWeight='bold' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BookmarkBorderIcon sx={{ color: 'primary.main' }} />

            {airline}
          </Typography>

          <Divider sx={{ my: 1 }} />

          <Stack
            direction='row'
            spacing={2}
            alignItems='center'
            sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}
          >
            <Typography variant='body1' fontWeight='bold' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PlaceIcon sx={{ color: 'secondary.main' }} />
              {from}
            </Typography>
            <Typography variant='body1' fontWeight='bold' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PlaceIcon sx={{ color: 'secondary.main' }} />
              {to}
            </Typography>
          </Stack>

          <Divider sx={{ my: 1 }} />

          <Stack
            direction='row'
            spacing={2}
            alignItems='center'
            sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}
          >
            <Typography variant='body2' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FlightTakeoffIcon sx={{ color: 'info.main' }} />
              {formatDateTime(departureTime)}
            </Typography>
            <Typography variant='body2' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FlightLandIcon sx={{ color: 'success.main' }} />
              {formatDateTime(arrivalTime)}
            </Typography>
          </Stack>

          <Divider sx={{ my: 1 }} />

          <Stack direction='row' spacing={2} sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
            <Typography variant='body2'>
              <strong>Terminal:</strong> {terminal}
            </Typography>
            <Typography variant='body2'>
              <strong>Gate:</strong> {gate}
            </Typography>
          </Stack>

          <Divider sx={{ my: 1 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AirplaneTicketIcon sx={{ color: 'warning.main' }} />
            <Typography variant='body2'>
              <strong>Tickets:</strong> {tickets.remaining}/{tickets.total} remaining
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
