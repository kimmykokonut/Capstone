import { useEffect, useState } from "react";
import { getPermitList, getLeaders, createTrip } from "../api-helper";

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
    <>
      <form onSubmit={handleTripCreation}>
        <title>Add New Trip</title>
        <fieldset>
          <legend>Trip Details</legend>
          <label htmlFor="date">Date <input type="date" name="date" placeholder="Date" id="date" /></label>
          <br />
          <input type="text" name="generalLocation" placeholder="Location (i.e. Mt Hood NF)" id="generalLocation" />
          <br />
          <input type="text" name="specificLocation" placeholder="45.3420633, -121.9420244" id="specificLocation" />
          <br />
          <label htmlFor="timeStart">Start Time <input type="time" name="timeStart" placeholder="Start Time" id="timeStart" /></label>
          <label htmlFor="timeEnd">End Time <input type="time" name="timeEnd" placeholder="End time" id="timeEnd" /></label>
          
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
          <input type="number" name="waitlist" placeholder="Waitlist Number" id="waitlist" />
          <br />
          <textarea name="restrictions" placeholder="Restrictions" id="restrictions" />
          <br />
          <input type="text" name="imageUrl" placeholder="Optional: Image Url" id="imageUrl" />
          <br />
          <textarea name="note" placeholder="Notes" id="note" />
          <br />
          <label htmlFor="registrationClose">Registration Close Date <input type="date" name="registrationClose" id="registrationClose" /></label>
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
        <button type="submit">Create trip</button>
      </form>
    </>
  )
}
export default NewTripForm;