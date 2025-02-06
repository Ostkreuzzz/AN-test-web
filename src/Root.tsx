import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import { NotFound } from './pages/NotFound';
import FlightsPage from './pages/FlightsPage';
import FlightDetailsPage from './pages/FlightDetailsPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<FlightsPage />} />

        <Route path='flights'>
          <Route path=':flightId' element={<FlightDetailsPage />} />
        </Route>
        <Route path='cart' element={<FlightDetailsPage />} />

        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  </Router>
);
