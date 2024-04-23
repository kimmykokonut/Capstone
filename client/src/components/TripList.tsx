//import { useEffect, useState } from "react";
//import { getTrips } from "../api-helper";
import Trip from "./Trip";

interface TripListProps {
  trips: {
    id: number;
    date: string;
    general_location: string;
    time_start: string;
    time_end: string;
    restrictions: string;
    image_url: string;
    status: string;
    leaderName: string;
  }[];
}
interface TripProps {
    id: number;
    date: string;
    general_location: string;
    time_start: string;
    time_end: string;
    restrictions: string;
    image_url: string;
    status: string;
    leaderName: string;
  };

const TripList: React.FC<TripListProps> = ({ trips }) => {

  // useEffect(() => {
  //   const fetchTrips = async () => {
  //     try {
  //       const response = await getTrips();
  //       setTrips(response.results); //props.setTrips
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };
  //   fetchTrips();
  // }, []);


  if (!trips) {
    return <div>Loading...</div>
  }
  return (
    <>
      <h2>Upcoming Field Trips</h2>
      {trips.map((trip: TripProps) => (
        <Trip
          key={trip.id}
          id={trip.id}
          date={trip.date}
          general_location={trip.general_location}
          time_start={trip.time_start}
          time_end={trip.time_end}
          restrictions={trip.restrictions}
          image_url={trip.image_url}
          status={trip.status}
          leaderName={trip.leaderName}
        />
      ))}
      <hr />
    </>
  );
};
export default TripList;