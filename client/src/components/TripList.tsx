import Trip from "./Trip";
import { Link } from "react-router-dom";
import { Grid, Typography } from "@mui/material";

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
      <Typography variant="h4" align="center" mt="30px">Upcoming Field Trips</Typography>
      <hr />
      {/* make this visible to admin/coordinator/leader */}
      <Link to='/add-trip'>Add new trip (auth only)</Link>
      <Grid container spacing={2}>
          {trips.map((trip: TripProps) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>

        <Trip
          key={trip.id}
          id={trip.id}
          date={trip.date}
          general_location={trip.general_location}
          restrictions={trip.restrictions}
          image_url={trip.image_url}
          status={trip.status}
        />
              </Grid>

      ))}
      </Grid>
    </>
  );
};
export default TripList;