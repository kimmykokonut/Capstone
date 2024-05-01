import { Link } from "react-router-dom";
import { Card, CardActions, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";

interface TripProps {
  id: number;
  date: string;
  general_location: string;
  restrictions: string;
  image_url: string;
  status: string;
};

const Trip: React.FC<TripProps> = ({ id, date, general_location, restrictions, image_url, status }) => {

  const formattedDate = new Date(date);
  const dateString = `${formattedDate.toLocaleString('default', { month: 'long' })} ${formattedDate.getDate()}, ${formattedDate.getFullYear()}`;

  return (
    <>
      <Card
        variant="outlined"
        sx={{ maxWidth: 350, m: '1rem', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#e0e0e0' }}>
        <CardMedia
          sx={{ height: 150 }}
          image={image_url}
          title="mushrooms in the forest"
        />
        <CardContent
          sx={{ mt: 1, height: 150, flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
          <Typography gutterBottom variant="h5" component="div">
            {dateString}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Status: {status}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {general_location}          </Typography>
          <Typography variant="body2" color="text.secondary">
            Restrictions: {restrictions || 'None'}          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CardActions>
            <Link to={`/trips/${id}`}>
              <Button
                variant="outlined"
                color="success"
                sx={{
                  borderColor: 'green',
                  color: 'green',
                  '&:hover': { backgroundColor: 'green', color: 'white' },
                  '&:focus': { outline: '2px solid red' }
                }}>Details/Register</Button>
            </Link>
          </CardActions>
        </Box>
      </Card>
    </>
  );
}
export default Trip;