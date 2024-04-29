import Mushroom from "./Mushroom";
import { MushroomProps } from "./Mushroom";
import { Link } from "react-router-dom";


interface MushroomListProps {
  mushrooms: MushroomProps[];
}

const MushroomList: React.FC<MushroomListProps> = ({ mushrooms }) => {

  if (!mushrooms) {
    return <div>Loading...</div>
  }
  return (
    <>
      <h2>Mushrooms seen on field trips</h2>
      {/* make this visible to admin/coordinator/leader */}
      <Link to='/mushrooms/new'>Add new mushroom (auth only)</Link>
      <hr />
      {mushrooms.map((mushroom: MushroomProps) => (
        <Mushroom
          key={mushroom.id}
          id={mushroom.id}
          common_name={mushroom.common_name}
          latin_name={mushroom.latin_name}
          image_url={mushroom.image_url}
          info_url={mushroom.info_url}
        />
      ))}
      <hr />
    </>
  );
};
export default MushroomList;