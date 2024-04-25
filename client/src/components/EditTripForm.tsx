import { useEffect, useState } from "react";
import { getPermitList, getLeaders, editTrip } from "../api-helper";
import { useParams } from "react-router-dom";
//import { TripProps } from "./TripControl";
import { TripData } from "../api-helper";

interface LeaderProps {
  id: number;
  first_name: string;
  last_name: string;
}
interface PermitProps {
  id: number;
  name: string;
}
export interface Trip {
  id: number;
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
interface EditTripProps {
  trips: Trip[];
}

const EditTripForm: React.FC<EditTripProps> = ({ trips }) => {
  const { id } = useParams();
  const trip = trips.find(trip => trip.id === Number(id));

  const [leaders, setLeaders] = useState<LeaderProps[]>([]);
  const [permitList, setPermitList] = useState<PermitProps[]>([]);
  const [tripData, setTripData] = useState<TripData | null>(null);

  useEffect(() => {
    if (trip) {
      setTripData(trip);
    }
  }, [trip]);

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

    const formData = new FormData(e.currentTarget);
    const formEdits: TripData = {
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
  await editTrip(formEdits, trip.id).then(() => {
    window.location.href = '/trips';
  });
};


return (
  <>
    <form onSubmit={handleEdit}>
      <title>Edit Trip</title>
      <fieldset>
        <legend>Trip Details</legend>
        <label htmlFor="date">Date <input type="date" name="date" placeholder="Date" id="date" defaultValue={trip?.date} /></label>
        <br />
        <input type="text" name="generalLocation" placeholder="Location (i.e. Mt Hood NF)" id="generalLocation" defaultValue={trip?.general_location} />
        <br />
        <input type="text" name="specificLocation" placeholder="Lat/Long of location" id="specificLocation" defaultValue={trip?.specific_location} />
        <br />
        <label htmlFor="timeStart">Start Time <input type="time" name="timeStart" placeholder="Start Time" id="timeStart" defaultValue={trip?.time_start} /></label>
        <label htmlFor="timeEnd">End Time <input type="time" name="timeEnd" placeholder="End time" id="timeEnd" defaultValue={trip?.time_end} /></label>

      </fieldset>
      <fieldset>
        <legend>Trip Leader</legend>
        <select name="leader" id="leader">
          {leaders.map((leader) => (
            <option value={leader.id} key={leader.id}>{leader.first_name} {leader.last_name}</option>
          ))}
        </select>
      </fieldset>
      <fieldset>
        <input type="number" name="capacity" placeholder="Capacity Number" id="capacity" />
        <input type="number" name="waitlist" placeholder="Waitlist Number" id="waitlist" defaultValue={trip?.waitlist} />
        <br />
        <textarea name="restrictions" placeholder="Restrictions" id="restrictions" defaultValue={trip?.restrictions} />
        <br />
        <textarea name="note" placeholder="Notes" id="note" defaultValue={trip?.note} />
        <br />
        <label htmlFor="registrationClose">Registration Close Date <input type="date" name="registrationClose" id="registrationClose" defaultValue={trip?.registration_close_date} /></label>
      </fieldset>

      <fieldset>
        <legend>Any parking or foraging permits needed?</legend>
        {permitList.map((permit) => (
          <div key={permit.id}>
            <label htmlFor={`permit-${permit.id}`}>
              <input type="checkbox" id={`permit-${permit.id}`} name="permits" value={permit.id} />{permit.name}</label>
          </div>
        ))}
      </fieldset>
      <button type="submit">Edit trip</button>
    </form>
  </>
)
}
export default EditTripForm;