import TripDetails from "./TripDetails";
import TripComments from "./TripComments";
import { TripProps } from "./TripControl";

interface TripDetailProps {
  trips: TripProps[];
}

const TripReport: React.FC<TripDetailProps> = ({ trips }) => {
  return (
    <>
      <TripDetails trips={trips}/>
      <hr />
      <p>comments cmponent here</p>
      <TripComments />
      <hr />
      <p>Mushrooms seen</p>
    </>
  )
}
export default TripReport;