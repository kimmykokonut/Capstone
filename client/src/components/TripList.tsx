import Trip from "./Trip";
import { Link } from "react-router-dom";
import { Grid, Typography, Button, Box } from "@mui/material";

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
  const groupStatus = JSON.parse(localStorage.getItem('group_status') || '[]');

  if (!trips) {
    return (
      <div className="loaderCentered">
        <div className="loader"></div>
        <h3>Loading...</h3>
      </div>
    )
  }

  return (
    <>
      <Typography variant="h4" align="center" mt="30px">Upcoming Field Trips</Typography>
      <hr />
      {(groupStatus.includes('Leader') || groupStatus.includes('Coordinator')) && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button
            variant="outlined"
            color="success"
            sx={{
              borderColor: 'green',
              color: 'green',
              '&:hover': { backgroundColor: 'green', color: 'white' },
              '&:focus': { outline: '2px solid red' }
            }}>
            <Link to='/add-trip' style={{ textDecoration: 'none', color: 'inherit' }}>Add new trip</Link>
          </Button>
        </Box>
      )}
      <Grid container spacing={2}>
        {trips.map((trip: TripProps) => (
          <Grid
            item xs={12} sm={6} md={4} lg={3}
            key={trip.id}
          >
            <Trip
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