import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Hero from './Hero';
import Dashboard from './Dashboard';
import TripList from './TripList';
import TripReport from './TripReport';
import { getTrips, getUser } from '../api-helper';

interface TripProps {
  id: number;
  date: string;
  general_location: string;
  time_start: string;
  time_end: string;
  restrictions: string;
  image_url: string;
  status: string;
  leader: number;
  leaderName: string;
}

const TripControl: React.FC = () => {
  const [trips, setTrips] = useState<TripProps[]>([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response: { results: TripProps[] } = await getTrips();
        const tripsWithLeaderName = await Promise.all(response.results.map(async (trip) => {
          const leaderData = await getUser(trip.leader);
          return { ...trip, leaderName: leaderData.first_name }
        }));
        setTrips(tripsWithLeaderName);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchTrips();
  }, []);

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
          element={<TripList trips={trips}/>} />
        <Route
          path='/trips/{id}'
          element={<TripReport trips={trips}/>} />
      </Routes>
    </>
  )
}
export default TripControl;