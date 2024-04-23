import TripDetails from "./TripDetails";
import TripComments from "./TripComments";
//import Trip from "./Trip";

const TripReport = () => {
  return (
    <>
      <TripDetails />
      <hr />
      <button>Register for trip</button>
      <p>Or confirmation registered</p>
      <hr />
      <TripComments />
      <hr />
      <p>Mushrooms seen</p>
    </>
  )
}
export default TripReport;