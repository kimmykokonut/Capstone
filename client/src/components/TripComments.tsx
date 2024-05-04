import { Button, Typography, Grid, TextField } from "@mui/material";

const TripComments = () => {
  return (
    <>
      <Typography variant="body1">Connect</Typography>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <TextField variant="outlined" type="text" placeholder="logistics? carpooling?" />
        </Grid>
        <Grid item>
      <Button variant="outlined">submit</Button>
      </Grid>
      </Grid>
    </>
  )
}
export default TripComments;