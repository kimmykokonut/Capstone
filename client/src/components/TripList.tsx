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
  }[];
}
interface TripProps {
    id: number;
    date: string;
    general_location: string;
    restrictions: string;
    image_url: string;
    status: string;
  };

const TripList: React.FC<TripListProps> = ({ trips }) => {

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
          restrictions={trip.restrictions}
          image_url={trip.image_url}
          status={trip.status}
        />
      ))}
      <hr />
    </>
  );
};
export default TripList;