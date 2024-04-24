import { useParams } from "react-router-dom";
import { TripProps } from "./TripControl";
import { useState, useEffect } from "react";
import { registerTrip, getRegistration } from "../api-helper";
import TripComments from "./TripComments";

interface TripDetailProps {
  trips: TripProps[];
};


const TripDetails: React.FC<TripDetailProps> = ({ trips }) => {
  const { id } = useParams<{ id: string }>();
  const trip = trips.find(trip => trip.id === Number(id));

  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  if (!trip) {
    return <div>Loading...</div>
  }

  useEffect(() => {
    const checkTripRegistration = async () => {
      try {
        const registrationStatus = await getRegistration(Number(id));
        console.log('tripid', id);        
        setIsRegistered(registrationStatus);
      } catch (error) {
        console.error('An error occurred:', error)
      }
    };
    checkTripRegistration();
  }, [id]);

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await registerTrip(Number(id));
      setIsRegistered(true);
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const formattedDate = new Date(trip.date);
  const formatCloseDate = new Date(trip.registration_close_date)
  const dateString = `${formattedDate.toLocaleString('default', { month: 'long' })} ${formattedDate.getDate()}, ${formattedDate.getFullYear()}`;
  const closeDate = `${formatCloseDate.toLocaleString('default', { month: 'long' })} ${formatCloseDate.getDate()}, ${formatCloseDate.getFullYear()}`;

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const tripTime = new Date();
    tripTime.setHours(Number(hours));
    tripTime.setMinutes(Number(minutes));
    return tripTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };

  const startTime = formatTime(trip.time_start);
  const endTime = formatTime(trip.time_end);



  return (
    <>

      <img src={trip.image_url} alt="forest photo" style={{ width: '150px', height: '150px' }} />
      <h3>Status: {trip.status}</h3>

      <p>Date: {dateString}</p>
      <p>Leader: {trip.leaderName}</p>
      <p>Time: {startTime} to {endTime}</p>
      <p>Area: {trip.general_location}</p>
      <p>(to become a map) Location: {trip.specific_location}</p>
      <p>Capacity: {trip.capacity}</p>
      <p>Restrictions: {trip.restrictions}</p>
      <p>Additional information: {trip.note}</p>
      <h3>Registration closes: {closeDate}</h3>
      <hr />
      <div id="genericInfo">
        <p>Field trips are for educational purposes. They take place rain or shine.  There is no guarantee of what will be found in the area.</p>
        <p></p>
        <ul>
          <li>Participation is limited to current OMS members and any household members with whom you share a membership.</li>
          <li>No guests allowed.</li>
          <li>Please register only if you are confident you can go if selected.
            No-shows and late cancellations will be banned from field trips through the following season. (For example, if you cancel last minute on a Spring trip, you will be banned through the following Fall season.) We've already had several people no-show or cancel late this season.</li>
          <li>Participants will be selected by a weighted random number lottery, with priority given to volunteers.</li>
          <li>You will be notified by email within 2 days of the registration closing date. If you do not see an email, check your spam folder.</li>
        </ul>
        <p>Covid-19 restrictions for this trip
          Carpooling: At your own risk
          If you have any covid symptoms, you may not attend the field trip. If you develop any covid-related symptoms within 10 days of said field trip, you must notify the trip leader.</p>

        <p>Can't make it on this trip?
          Organize your own foray with members outside of a regular field trip. Go to Members Only/Forums/Self Led Trips.</p>
        <p>We have a forum organized by interest group to socialize and connect here:
          https://www.wildmushrooms.org/resources/forums/</p>
        <p>If you have general questions about this process or our field trips, contact us at fieldtrips@wildmushrooms.org.
          For general questions about OMS, email us at info@wildmushrooms.org.</p>
      </div>
      <hr />
      <p>Checkbox to agree</p>
      {!isRegistered ? (
        <form onSubmit={handleRegistration}>
          <legend>Apply here</legend>
          <button type="submit" disabled={isLoading}>{isLoading ? 'Registration in progress...' : 'Register'}</button>
        </form>
      ) : (
        <h3>You have registered for this trip</h3>
      )}
      <hr />
      <p>weather api call based on specific_location</p>
      <p>leaflet map? specific_location</p>
      <hr />
      <TripComments />
      <hr />
      <p>mushroom component</p>
    </>
  )
}
export default TripDetails;