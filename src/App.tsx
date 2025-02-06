import { Outlet } from 'react-router-dom';

import Navigation from '@components/Navigation';
import { Alert, Snackbar } from '@mui/material';

import { unsetMessage } from './store/slices/messageReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const message = useSelector((state: RootState) => state.messageStore);

  return (
    <div>
      <div
        className='flex flex-col items-center justify-between gap-24
            desktop:flex-row desktop:items-start  desktop:justify-start desktop:gap-0 desktop:py-32'
      >
        <div className='desktop:pl-32'>
          <Navigation />
        </div>
        <Snackbar
          open={message.isMessage}
          autoHideDuration={2000}
          onClose={() => dispatch(unsetMessage())}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => dispatch(unsetMessage())} severity={message.type} sx={{ width: '100%' }}>
            {message.text}
          </Alert>
        </Snackbar>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
