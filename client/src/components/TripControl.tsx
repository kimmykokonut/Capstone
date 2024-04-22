import { Route, Routes } from 'react-router-dom';
import Hero from './Hero';
import Dashboard from './Dashboard';

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
      </Routes>
    </>
  )
}
export default TripControl;