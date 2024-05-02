import { useEffect, useState } from "react";
import { getProfile } from "../api-helper";
import { Link } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import ProfileForm from "./ProfileForm";
import { TripProps } from "./TripControl";
import { Container, CardHeader, Avatar, CardContent, Typography, Card, CardActions, Box } from "@mui/material";

type User = {
  user: {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  phone: string;
  e_name: string;
  e_phone: string;
  avatar: string;
  expiration_date: Date;
  family: string;
  skills: string;
}

type DashboardProps = {
  userRegistrations: { trip_id: number, status: string }[];
  trips: TripProps[];
}

const Dashboard: React.FC<DashboardProps> = ({ userRegistrations, trips }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        setUser(profileData);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchProfile();
  }, []);

  if (!user) {
    return <div>Loading...</div>
  }
  return (
    <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card variant="elevation" elevation={3} sx={{ p: 4, mt: "64px", backgroundColor: '#e0e0e0'}} style={{ display: 'inline-block' }}>
        <CardHeader
          avatar={
            <Avatar
              src={user?.avatar}
              aria-label="user avatar"
              sx={{ width: 100, height: 100, border: '1px solid black' }} />
          }
          title={`${user?.user.first_name} ${user?.user.last_name}`}
          titleTypographyProps={{ variant: 'h5', sx: { fontSize: '1.5rem' } }}
          subheader={user?.user.username}
          subheaderTypographyProps={{ variant: 'subtitle1', sx: { fontSize: '1.2rem' } }}
        >
        </CardHeader>
        <CardContent >
          <Typography variant="subtitle1" color="text.secondary">Phone: {user?.phone || 'None provided'}</Typography>
          <Typography variant="subtitle1" color="text.secondary">Emergency Contact: {user?.e_name || 'None provided'} </Typography>
          <Typography variant="subtitle1" color="text.secondary">Emergency Phone: ({user?.e_phone || 'None provided'})</Typography>
          <Typography variant="subtitle1" color="text.secondary">Membership expiration: {user?.expiration_date ? new Date(user.expiration_date).toLocaleDateString() : 'None provided'}</Typography>
          <Typography variant="subtitle1" color="text.secondary">Family: {user?.family || 'None provided'}</Typography>
          <Typography variant="subtitle1" color="text.secondary">Skills: {user?.skills || 'None provided'}</Typography>
          <Typography variant="subtitle1" color="text.secondary"></Typography>
        </CardContent>
        <Card sx={{
          mt: 2, backgroundColor: '#f5f5f5' }}>
          <Typography variant="h6" align="center">Trip registrations:</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {userRegistrations
              .sort((a, b) => {
                const tripA = trips.find(trip => trip.id === a.trip_id);
                const tripB = trips.find(trip => trip.id === b.trip_id);
                if (!tripA || !tripB) {
                  return 0;
                }
                return new Date(tripB.date).getTime() - new Date(tripA.date).getTime();
              })
              .map((regStatus, index) => {
                const trip = trips.find(trip => trip.id === regStatus.trip_id);
                return (
                  <Typography variant="subtitle1" key={index}>{regStatus.status}: {trip ? new Date(trip.date).toLocaleDateString() : 'Not found'} </Typography>
                );
              })}
          </Box>
        </Card>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Box
            component="span"
            sx={{
              '& a': {
                textDecoration: 'none',
                color: 'green',
                '&:hover': {
                  textDecoration: 'underline',
                  color: 'black'
                }
              }
            }}
          >
          <Link to="/trips">See upcoming trips</Link>
          </Box>
            <Box
              component="span"
              sx={{
                '& a': {
                  textDecoration: 'none',
                  color: 'green',
                  '&:hover': {
                    textDecoration: 'underline',
                    color: 'black'
                  }
                }
              }}
            >
          <Link to="/dashboard/profile">Update info</Link>
          <Routes>
            <Route path='profile' element={<ProfileForm user={user} />} />
          </Routes>
          </Box>
        </CardActions>
      </Card>
    </Container>

    // <div style={{ marginTop: '64px' }}>
    //   <img src={user.avatar} alt="user avatar" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
    //   <h1>{user?.user.first_name} {user?.user.last_name}</h1>
    //   <p>Username: {user?.user.username}</p>
    //   <p>Phone: {user?.phone || 'None provided'}</p>
    //   <p>Emergency Contact: {user?.e_name || 'None provided'} ({user?.e_phone || 'None provided'}) </p>
    //   <p>Membership expiration: {user?.expiration_date ? new Date(user.expiration_date).toLocaleDateString() : 'None provided'}</p>
    //   <p>Family: {user?.family || 'None provided'}</p>
    //   <p>Skills: {user?.skills || 'None provided'}</p>
    //   <Link to="/dashboard/profile">Update info</Link>
    //   <Routes>
    //     <Route path='profile' element={<ProfileForm user={user} />} />
    //   </Routes>
    //   <hr />
    //   <p>Trip registrations:</p>
    //   {userRegistrations
    //     .sort((a, b) => {
    //       const tripA = trips.find(trip => trip.id === a.trip_id);
    //       const tripB = trips.find(trip => trip.id === b.trip_id);
    //       if (!tripA || !tripB) {
    //         return 0;
    //       }
    //       return new Date(tripB.date).getTime() - new Date(tripA.date).getTime();
    //     })
    //     .map((regStatus, index) => {
    //       const trip = trips.find(trip => trip.id === regStatus.trip_id);
    //       return (
    //         <p key={index}>{regStatus.status}: {trip ? new Date(trip.date).toLocaleDateString() : 'Not found'} </p>
    //       );
    //     })}
    //   <hr />
    //   <a href="/trips">See upcoming trips</a>
    //   <hr />
    // </div>
  );
};
export default Dashboard;