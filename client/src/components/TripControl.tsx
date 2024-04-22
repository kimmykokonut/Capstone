import { Route, Routes } from 'react-router-dom';
import Hero from './Hero';
import Dashboard from './Dashboard';
import TripList from './TripList';
import TripReport from './TripReport';

const TripControl = () => {
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={<Hero />} />
        <Route
          path='/dashboard/*'
          element={<Dashboard />} />
        <Route
          path='/trips'
          element={<TripList />} />
        <Route
          path='/trips/{id}'
          element={<TripReport />} />
      </Routes>
    </>
  )
}
export default TripControl;