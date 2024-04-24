import { Link } from "react-router-dom";

interface TripProps {
  id: number;
  date: string;
  general_location: string;
  restrictions: string;
  image_url: string;
  status: string;
};

const Trip: React.FC<TripProps> = ({ id, date, general_location, restrictions, image_url, status }) => {

  const formattedDate = new Date(date);
  const dateString = `${formattedDate.toLocaleString('default', { month: 'long'})} ${formattedDate.getDate()}, ${formattedDate.getFullYear()}`;

  return (
    <>
      <div>
        <img src={image_url} alt="forest scene" style={{ width: '150px', height: '150px' }} />
        <h3>{dateString}</h3>
        <h4>Status: {status}</h4>
        <p>{general_location}</p>
        <p>Restrictions: {restrictions || 'None'} </p>
        <Link to={`/trips/${id}`}>
          <button>Details/Register</button>
        </Link>
        <hr />
      </div>
    </>
  );
}
export default Trip;