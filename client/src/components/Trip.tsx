interface TripProps {
  id: number;
  date: string;
  general_location: string;
  time_start: string;
  time_end: string;
  restrictions: string;
  image_url: string;
  status: string;
  leader: string;
  whenTripClicked: (id: number) => void;
}

const Trip: React.FC<TripProps> = ({ id, date, general_location, time_start, time_end, restrictions, image_url, status, leader, whenTripClicked }) => {

  const formattedDate = new Date(date);
  const dateString = `${formattedDate.toLocaleString('default', { month: 'long'})} ${formattedDate.getDate()}, ${formattedDate.getFullYear()}`;

  return (
    <>
      <div onClick={() => whenTripClicked(id)}>
        <img src={image_url} alt="forest scene" style={{ width: '150px', height: '150px' }} />
        <h3>{dateString}</h3>
        <h4>Status: {status}</h4>
        <p>Leader: {leader}</p>
        <p>{general_location}</p>
        <p>{time_start} - {time_end}</p>
        <p>Restrictions: {restrictions || 'None'} </p>
        <hr />
      </div>
    </>
  );
}
export default Trip;