import { useEffect, useState } from 'react';
import { Typography, Container, Paper, Stack, Divider } from '@mui/material';
import { setMessage } from 'store/slices/messageReducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';

import BasicButton from '@components/Button';
import { deleteAllCart, removeFromCart } from 'store/slices/cartReducer';
import { FlightSeat } from '@interfaces/Flight';

export default function FlightDetailsPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cartStore.value);

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalAmountOfTickets, setTotalAmountOfTickets] = useState(0);

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.ticketsValue, 0);
    const amount = cartItems.reduce((acc, item) => acc + item.amountOfTickets, 0);
    setTotalPrice(total);
    setTotalAmountOfTickets(amount);
  }, [cartItems]);

  const handlePurchase = () => {
    dispatch(deleteAllCart());
    dispatch(
      setMessage({
        text: `Tickets were successfully purchased, check your email!`,
        type: 'success',
        isMessage: true,
      }),
    );
  };

  const handleDeleteAll = () => {
    dispatch(deleteAllCart());
    dispatch(
      setMessage({
        text: `Your cart is now empty :^()`,
        type: 'warning',
        isMessage: true,
      }),
    );
  };

  const handleDelete = (item: FlightSeat) => {
    dispatch(removeFromCart(item));
    dispatch(
      setMessage({
        text: `Deleted tickets for Flight #${item.flightId}`,
        type: 'warning',
        isMessage: true,
      }),
    );
  };

  if (!cartItems.length) {
    return (
      <Container maxWidth='md' sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant='h5'>Your cart is empty</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth='lg'>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
        <Stack flex={2} spacing={2}>
          <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
            <Stack direction='row' mb={2}>
              <BasicButton title='Clear All' handleClick={handleDeleteAll} isDisabled={!cartItems.length} />
            </Stack>

            <Stack spacing={2}>
              {cartItems.map((item) => (
                <Paper key={item.flightId} elevation={3} sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 2 }}>
                  <Stack spacing={1} alignItems='center'>
                    <Typography variant='h6' color='primary'>
                      <strong>Flight #{item.flightId}</strong>
                    </Typography>
                    <Divider sx={{ my: 1, width: '100%' }} />
                    <Typography variant='body1'>Price: ${item.ticketsValue}</Typography>
                    <Typography variant='body1'>Amount of Tickets: {item.amountOfTickets}</Typography>
                    <Divider sx={{ my: 1, width: '100%' }} />
                    <BasicButton
                      title='Delete Tickets'
                      handleClick={() => handleDelete(item)}
                      isDisabled={!cartItems.length}
                    />
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </Paper>
        </Stack>

        <Stack flex={1}>
          <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
            <Stack spacing={2} alignItems='center'>
              <Typography variant='h6'>Order Summary</Typography>
              <Divider sx={{ width: '100%' }} />
              <Typography variant='h6'>
                <strong>Total Price: ${totalPrice}</strong>
              </Typography>
              <Typography variant='h6'>
                <strong>Total Tickets: {totalAmountOfTickets}</strong>
              </Typography>
              <Divider sx={{ width: '100%' }} />
              <BasicButton title='Buy' handleClick={handlePurchase} isDisabled={!cartItems.length} />
            </Stack>
          </Paper>
        </Stack>
      </Stack>
    </Container>
  );
}
