import { useEffect, useState } from "react";
import { getPermitList, getLeaders, editTrip } from "../api-helper";
import { useParams, useNavigate } from "react-router-dom";
import { getTripById } from "../api-helper";
import { TripProps } from "./TripControl";
import { TextField, Button, InputLabel, Checkbox, Typography, Container, Grid, Input } from "@mui/material";
import { Check } from "@mui/icons-material";

interface LeaderProps {
  id: number;
  first_name: string;
  last_name: string;
}
interface PermitProps {
  id: number;
  name: string;
}

interface EditTripProps {
  trips: TripProps[];
  updateTrips: (updatedTrip: TripProps) => void;
}
interface EditTripFormData {
  date: string;
  general_location: string;
  time_start: string;
  time_end: string;
  restrictions: string;
  leader: number;
  specific_location: string;
  capacity: number;
  note: string;
  registration_close_date: string;
  permits: number[];
  waitlist: number;
}

const EditTripForm: React.FC<EditTripProps> = ({ trips, updateTrips }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const trip = trips.find(trip => trip.id === Number(id));

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

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!trip) {
      throw new Error('Trip is undefined');
    }

    const formData = new FormData(e.currentTarget);
    const formEdits: EditTripFormData = {
      date: formData.get('date') as string,
      general_location: formData.get('generalLocation') as string,
      specific_location: formData.get('specificLocation') as string,
      time_start: formData.get('timeStart') as string,
      time_end: formData.get('timeEnd') as string,
      leader: Number(formData.get('leader')),
      capacity: Number(formData.get('capacity')),
      waitlist: Number(formData.get('waitlist')),
      restrictions: formData.get('restrictions') as string,
      note: formData.get('note') as string,
      registration_close_date: formData.get('registrationClose') as string,
      permits: formData.getAll('permits').map(value => Number(value)),
    };
    await editTrip(formEdits, trip.id);
    const fetchedTrip = await getTripById(trip.id);
      updateTrips(fetchedTrip);
      navigate('/trips');
  };

  return (
    <Container maxWidth="md">
      <form onSubmit={handleEdit}>
        <Typography mt={2} variant="h5">Edit Trip</Typography>
        <fieldset>
          <legend>Trip Details</legend>
          <InputLabel htmlFor="date">Date <TextField type="date" name="date" placeholder="Date" id="date" defaultValue={trip?.date} variant="standard"/></InputLabel>
          <br />
          <InputLabel htmlFor="generalLocation">General Location
            <TextField name="generalLocation" placeholder="Location (i.e. Mt Hood NF)" id="generalLocation" defaultValue={trip?.general_location} variant="standard" fullWidth/></InputLabel>
          <br />
          <InputLabel htmlFor="specificLocation">Latitude, Longitude
            <TextField 
            name="specificLocation" 
            placeholder="Lat/Long of location" 
            id="specificLocation" 
              defaultValue={trip?.specific_location} variant="standard"/></InputLabel>
          <br />
          <InputLabel htmlFor="timeStart">Start Time <TextField type="time" name="timeStart" placeholder="Start Time" id="timeStart" defaultValue={trip?.time_start} variant="standard" /></InputLabel>
          <InputLabel htmlFor="timeEnd">End Time <TextField type="time" name="timeEnd" placeholder="End time" id="timeEnd" defaultValue={trip?.time_end} variant="standard" /></InputLabel>
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
          <InputLabel htmlFor="capacity">Capacity
            <TextField type="number" name="capacity" placeholder="Capacity Number" id="capacity" defaultValue={trip?.capacity} variant="standard"/></InputLabel>
          <br />
          <InputLabel htmlFor="waitlist">Waitlist size
            <TextField type="number" name="waitlist" 
            id="waitlist" defaultValue={trip?.waitlist} variant="standard" /></InputLabel>
          <br />
          <InputLabel htmlFor="restrictions">Restrictions
            <TextField name="restrictions" id="restrictions" defaultValue={trip?.restrictions} variant="standard" multiline/></InputLabel>
          <br />
          <InputLabel htmlFor="note">Additional information
            <TextField name="note" id="note" defaultValue={trip?.note} variant="standard" /></InputLabel>
          <br />
          <InputLabel htmlFor="registrationClose">Registration Close Date <TextField type="date" name="registrationClose" id="registrationClose" defaultValue={trip?.registration_close_date} variant="standard" /></InputLabel>
        </fieldset>
        <fieldset>
          <legend>Any parking or foraging permits needed?</legend>
          {permitList.map((permit) => (
            <div key={permit.id}>
              <InputLabel htmlFor={`permit-${permit.id}`}>
                <Checkbox id={`permit-${permit.id}`} name="permits" value={permit.id} defaultChecked={trip?.permits.includes(permit.id)}/>{permit.name}</InputLabel>
            </div>
          ))}
        </fieldset>
        <Button 
        type="submit"
        variant="contained"
        color="success"
        >Edit trip</Button>
      </form>
    </Container>
  )
}
export default EditTripForm;