import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Hero from './Hero';
import Dashboard from './Dashboard';
import TripList from './TripList';
import TripDetails from './TripDetails';
import Resources from './Resources';
import { getTrips, getUser, getUserRegistrations, getMushrooms, checkAuthentication } from '../api-helper';
import NewTripForm from './NewTripForm';
import EditTripForm from './EditTripForm';
import Checklist from './Checklist';
import MushroomList from './MushroomList';
import { MushroomProps } from './Mushroom';
import { useLocation, useNavigate } from 'react-router-dom';

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
  capacity: number;
  note: string;
  registration_close_date: string;
  permits: number[];
  waitlist: number;
}

const TripControl: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [trips, setTrips] = useState<TripProps[]>([]);
  const [userRegistrations, setUserRegistrations] = useState<any[]>([]);
  const [mushrooms, setMushrooms] = useState<MushroomProps[]>([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkUserAuthentication = async () => {
      const response = await checkAuthentication();
      setIsAuthenticated(response.isAuthenticated);
      if (response.isAuthenticated && location.pathname === '/') {
        navigate('/dashboard');
      }
    };
    checkUserAuthentication();
  }, [navigate, location.pathname]);

  useEffect(() => {
    if (isAuthenticated) {
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
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {

      const fetchUserRegistrations = async () => {
        try {
          const registrations = await getUserRegistrations();
          setUserRegistrations(registrations);
        } catch (error) {
          console.error('Error:', error);
        }
      };
      fetchUserRegistrations();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchMushrooms = async () => {
        try {
          const response: { results: MushroomProps[] } = await getMushrooms();
          setMushrooms(response.results);
        } catch (error) {
          console.error('Error:', error);
        }
      };
      fetchMushrooms();
    }
  }, [isAuthenticated]);

  const updateTrips = (updatedTrip: TripProps) => {
    setTrips(trips => trips.map(trip => trip.id === updatedTrip.id ? updatedTrip : trip));
  }

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={<Hero isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
        <Route
          path='/dashboard/*'
          element={<Dashboard userRegistrations={userRegistrations} trips={trips} />} />
        <Route
          path='/trips/:id'
          element={<TripDetails trips={trips} updateTrips={updateTrips} />} />
        <Route
          path='/trips'
          element={<TripList trips={trips} />} />
        <Route
          path='/add-trip'
          element={<NewTripForm />} />
        <Route
          path='/trips/edit/:id'
          element={<EditTripForm trips={trips} updateTrips={updateTrips} />} />
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