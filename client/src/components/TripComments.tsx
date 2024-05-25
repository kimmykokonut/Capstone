import { Button, Typography, Grid, TextField, Card, CardHeader, CardContent, Avatar } from "@mui/material";
import forageIcon from '../assets/images/forageIcon.png';

const TripComments = () => {
  return (
    <>
      <Card sx={{
        backgroundColor: 'grey.800',
        color: '#fff'
      }}>
        <CardHeader
          title={
            <Typography variant="h6">Comments</Typography>
          }
          avatar={
            <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: '50px', height: '50px' }}>
              <img src={forageIcon} alt="Person picking a mushroom" style={{ objectFit: 'cover', height: '100%', width: '100%', padding: '10%' }} />
            </Avatar>
          } />
        <CardContent>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs>
              <TextField
                label="Let's connect..."
                multiline
                fullWidth
                color="success"
                maxRows={3}
                variant="outlined"
                type="text"
                placeholder="logistics? carpooling?"
                InputLabelProps={{
                  style: { color: '#fff' }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#fff',
                    }
                  }
                }} />
            </Grid>
            <Grid item>
              <Button color="success"
                variant="contained"
                size="medium" >submit</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}
export default TripComments;