import { useEffect, useState } from "react";
import { getPermitList, getLeaders, createTrip } from "../api-helper";
import { TextField, Button, InputLabel, Checkbox, Typography, Container, Grid } from "@mui/material";

interface LeaderProps {
  id: number;
  first_name: string;
  last_name: string;
}
interface PermitProps {
  id: number;
  name: string;
}
export interface NewTripData {
  date: string;
  general_location: string;
  specific_location: string;
  time_start: string;
  time_end: string;
  leader: number;
  capacity: number;
  waitlist: number;
  restrictions: string;
  note: string;
  registration_close_date: string;
  permits: number[];
}

const NewTripForm = () => {
  const [leaders, setLeaders] = useState<LeaderProps[]>([]);
  const [permitList, setPermitList] = useState<PermitProps[]>([]);

  const fetchLeaders = async () => {
    setLeaders(await getLeaders());
  };
  const fetchPermitList = async () => {
    setPermitList(await getPermitList());
  }
  useEffect(() => {
    fetchLeaders();
  }, []);
  useEffect(() => {
    fetchPermitList();
  }, []);

  const handleTripCreation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    let specificLocation = formData.get('specificLocation') as string;
    if (!specificLocation) {
      specificLocation = "45.3420633, -121.9420244";
    }

    const newTrip: NewTripData = {
      date: formData.get('date') as string,
      general_location: formData.get('generalLocation') as string,
      specific_location: specificLocation,
      time_start: formData.get('timeStart') as string,
      time_end: formData.get('timeEnd') as string,
      leader: Number(formData.get('leader')),
      capacity: Number(formData.get('capacity')),
      waitlist: Number(formData.get('waitlist')),
      restrictions: formData.get('restrictions') as string,
      note: formData.get('note') as string,
      registration_close_date: formData.get('registrationClose') as string,
      permits: formData.getAll('permits').map(Number),
    };
    await createTrip(newTrip).then(() => {
      window.location.href = '/trips';
    });
  };

  return (
    <Container maxWidth="md">
      <form onSubmit={handleTripCreation}>
        <Typography variant="h5" mt={2}>Add New Trip</Typography>
        <fieldset>
          <legend>Trip Details</legend>
          <InputLabel htmlFor="date">Date: <TextField type="date" name="date" id="date" variant="standard" /></InputLabel>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField name="generalLocation" label="Location (i.e. Mt Hood NF)" id="generalLocation" variant="standard" />
            </Grid>
            <Grid item xs={6}>
              <TextField name="specificLocation" placeholder="45.3420633, -121.9420244" id="specificLocation" label="Latitude, Longitude" variant="standard" />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InputLabel htmlFor="timeStart">Start Time <TextField type="time" name="timeStart" placeholder="Start Time" id="timeStart" variant="standard" /></InputLabel>
            </Grid>
            <Grid item xs={6}>
              <InputLabel htmlFor="timeEnd">End Time <TextField type="time" name="timeEnd" placeholder="End time" id="timeEnd" variant="standard" /></InputLabel>
            </Grid>
          </Grid>
        </fieldset>
        <fieldset>
          <legend>Trip Leader</legend>
          <select
            name="leader"
            id="leader"
            style={{ fontSize: '16px', height: '30px', width: '25%' }}
          >
            {leaders.map((leader) => (
              <option value={leader.id} key={leader.id}>{leader.first_name} {leader.last_name}</option>
            ))}
          </select>
        </fieldset>
        <fieldset>
          <TextField type="number" name="capacity" id="capacity" variant="standard" label="Capacity Number" />
          <br />
          <TextField type="number" name="waitlist" label="Waitlist Number" id="waitlist" variant="standard" />
          <br />
          <TextField name="restrictions" label="Restrictions" id="restrictions" variant="standard" multiline />
          <br />
          <TextField name="imageUrl" label="Optional: Image Url" id="imageUrl" variant="standard" />
          <br />
          <TextField name="note" label="Notes" id="note" variant="standard" multiline />
          <br />
          <InputLabel htmlFor="registrationClose">Registration Close Date <TextField type="date" name="registrationClose" id="registrationClose" variant="standard" /></InputLabel>
        </fieldset>
        <fieldset>
          <legend>Any parking or foraging permits needed?</legend>
          {permitList.map((permit) => (
            <div key={permit.id}>
              <InputLabel htmlFor={`permit-${permit.id}`}>
                <Checkbox
                  id={`permit-${permit.id}`}
                  name="permits"
                  value={permit.id} />
                {permit.name}
              </InputLabel>
            </div>
          ))}
        </fieldset>
        <Button type="submit" variant="contained" color="success">Create trip</Button>
      </form>
    </Container>
  )
}
export default NewTripForm;