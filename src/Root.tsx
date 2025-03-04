import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import App from 'App';
import { NotFound } from 'pages/NotFound';
import FlightsPage from 'pages/FlightsPage';
import FlightDetailsPage from 'pages/FlightDetailsPage';
import BookmarksPage from 'pages/BookmarksPage';
import CartPage from 'pages/CartPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<FlightsPage />} />

        <Route path='flights'>
          <Route index path=':flightId' element={<FlightDetailsPage />} />
        </Route>
        <Route path='cart' element={<CartPage />} />
        <Route path='bookmarks' element={<BookmarksPage />} />

        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  </Router>
);
