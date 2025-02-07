import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

import { Flight } from '@interfaces/Flight';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { FlightTakeoff, FlightLand, AirplaneTicket, Place, BookmarkBorder, Bookmark } from '@mui/icons-material';
import { formatDateTime } from 'handlers/handleTimeFormat';

import { add, remove } from '../store/slices/bookmarkReducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Link } from 'react-router-dom';
import { setMessage } from 'store/slices/messageReducer';

export default function FlightCard({
  airline,
  from,
  to,
  departureTime,
  arrivalTime,
  terminal,
  gate,
  tickets,
  id,
}: Flight) {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state: RootState) => state.bookmarkStore.value);

  const isBookmarked = bookmarks.includes(id);

  const handleBookmarksAction = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();

    if (bookmarks.includes(id)) {
      dispatch(remove(id));
      dispatch(
        setMessage({
          text: `Flight № ${id} removed from bookmarks!`,
          type: 'success',
          isMessage: true,
        }),
      );
    } else {
      dispatch(add(id));
      dispatch(
        setMessage({
          text: `Flight № ${id} added to bookmarks`,
          type: 'info',
          isMessage: true,
        }),
      );
    }
  };

  return (
    <Link to={`/flights/${id}`}>
      <Card sx={{ maxWidth: 400, borderRadius: 3, boxShadow: 3 }} className=' hover:scale-105'>
        <CardActionArea>
          <CardContent>
            <Typography variant='h6' fontWeight='bold' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {isBookmarked ? (
                <Bookmark sx={{ color: 'primary.main' }} onClick={handleBookmarksAction} />
              ) : (
                <BookmarkBorder sx={{ color: 'primary.main' }} onClick={handleBookmarksAction} />
              )}

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
                <Place sx={{ color: 'secondary.main' }} />
                {from}
              </Typography>
              <Typography variant='body1' fontWeight='bold' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Place sx={{ color: 'secondary.main' }} />
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
                <FlightTakeoff sx={{ color: 'info.main' }} />
                {formatDateTime(departureTime)}
              </Typography>
              <Typography variant='body2' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FlightLand sx={{ color: 'success.main' }} />
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
              <AirplaneTicket sx={{ color: 'warning.main' }} />
              <Typography variant='body2'>
                <strong>Tickets:</strong> {tickets.remaining}/{tickets.total} remaining
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
