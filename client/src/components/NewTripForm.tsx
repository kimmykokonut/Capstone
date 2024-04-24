import { useEffect, useState } from "react";

const NewTripForm = () => {
  const [leaders, setLeaders] = useState([]);
  const [permitList, setPermitList] = useState([]);

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

  const handleTripCreation = () => {
    //create trip
  }

  return (
    <>
      <form onSubmit={handleTripCreation}>
        <fieldset>
          <legend>Create new field trip</legend>
          <input type="date" name="date" placeholder="Date" id="date" />
          <input type="text" name="generalLocation" placeholder="Location (i.e. Mt Hood NF)" id="generalLocation" />
          <input type="text" name="specificLocation" placeholder="Lat/Long of location" id="specificLocation" />
          <input type="time" name="timeStart" placeholder="Start Time" id="timeStart" />
          <input type="time" name="timeEnd" placeholder="End time" id="timeEnd" />
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
          <input type="text" name="waitlist" placeholder="Waitlist Number" id="waitlist" />
          <textarea name="restrictions" placeholder="Restrictions" id="restrictions" />
          <input type="text" name="imageUrl" placeholder="Image Url" id="imageUrl" />
          <textarea name="note" placeholder="Notes" id="note" />
          <input type="date" name="registrationClose" placeholder="Date registration closes" id="registrationClose" />
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