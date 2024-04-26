import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Hero from './Hero';
import Dashboard from './Dashboard';
import TripList from './TripList';
import TripDetails from './TripDetails';
import Resources from './Resources';
import { getTrips, getUser, getUserRegistrations, getMushrooms } from '../api-helper';
import NewTripForm from './NewTripForm';
import EditTripForm from './EditTripForm';
import Checklist from './Checklist';
import MushroomList from './MushroomList';
import { MushroomProps } from './Mushroom';

export interface PermitProps {
  id: number;
  type: string;
  day_cost: number;
  annual_cost: number;
  name: string;
}

export interface TripProps {
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
  specific_location: string;
  capacity: string;
  note: string;
  registration_close_date: string;
  permits: PermitProps[];
}

const TripControl: React.FC = () => {
  const [trips, setTrips] = useState<TripProps[]>([]);
  const [userRegistrations, setUserRegistrations] = useState<any[]>([]);
  const [mushrooms, setMushrooms] = useState<MushroomProps[]>([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response: { results: TripProps[] } = await getTrips();
        console.log(response);
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

  useEffect(() => {
    const fetchUserRegistrations = async () => {
      try {
        const registrations = await getUserRegistrations();
        setUserRegistrations(registrations);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchUserRegistrations();
  }, []);

  useEffect(() => {
    const fetchMushrooms = async () => {
      try {
        const response: { results: MushroomProps[] } = await getMushrooms();
        console.log(response);
        setMushrooms(response.results);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchMushrooms();
  }, []);

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={<Hero />} />
        <Route
          path='/dashboard/*'
          element={<Dashboard userRegistrations={userRegistrations} trips={trips} />} />
        <Route
          path='/trips/:id'
          element={<TripDetails trips={trips} />} />
        <Route
          path='/trips'
          element={<TripList trips={trips} />} />
        <Route
          path='/add-trip'
          element={<NewTripForm />} />
        <Route
          path='/trips/edit/:id'
          element={<EditTripForm trips={trips} />} />
        <Route
          path='/resources/checklist'
          element={<Checklist />} />
        <Route
          path='/resources'
          element={<Resources />} />
        <Route
          path='/mushrooms'
          element={<MushroomList mushrooms={mushrooms} />} />

      </Routes>
    </>
  )
}
export default TripControl;