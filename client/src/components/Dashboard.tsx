import { useEffect, useState } from "react";
import { getProfile } from "../api-helper";
import { Link } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import ProfileForm from "./ProfileForm";

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

const Dashboard = () => {
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
    <>
      <img src={user.avatar} alt="user avatar" style={{ width: '100px', height: '100px', borderRadius: '50%'}}/>
      <h1>{user?.user.first_name} {user?.user.last_name}</h1>
      <p>Username: {user?.user.username}</p>
      <p>Phone: {user?.e_phone || 'None provided'}</p>
      <p>Emergency Contact: {user?.e_name || 'None provided'} ({user?.e_phone || 'None provided'}) </p>
      <p>Membership expiration: {user?.expiration_date ? new Date(user.expiration_date).toLocaleDateString() : 'None provided'}</p>
      <p>Family: {user?.family || 'None provided'}</p>
      <p>Skills: {user?.skills || 'None provided'}</p>
      <Link to="/dashboard/profile">Update info</Link>
      <Routes>
        <Route path='profile' element={<ProfileForm user={user}/>} />
      </Routes>
      <hr />
      <p>Trips registered:</p>
      <p>Trips attended:</p>
      <hr />
      <a href="/trips">Register for upcoming trips</a>
      <hr />
      
    </>
  );
};
export default Dashboard;