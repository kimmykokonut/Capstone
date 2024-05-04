import { Button, Typography, Grid, TextField } from "@mui/material";

const TripComments = () => {
  return (
    <>
      <Typography variant="h6">Comments</Typography>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <TextField 
          label="Connect with others"
          multiline 
          maxRows={3} 
          variant="outlined" 
          type="text" 
          placeholder="logistics? carpooling?" />
        </Grid>
        <Grid item>
      <Button variant="outlined">submit</Button>
      </Grid>
      </Grid>
    </>
  )
}
export default TripComments;