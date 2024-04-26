
export interface MushroomProps {
  id: number;
  common_name: string;
  latin_name: string;
  image_url: string;
  info_url: string;
};

const Mushroom: React.FC<MushroomProps> = ({ id, common_name, latin_name, image_url, info_url }) => {

  return (
    <>
      <div id={id.toString()}>
        <img src={image_url} alt="mushroom" style={{ width: '150px', height: '150px' }} />
        <h3>{common_name}</h3>
        <h4><em>{latin_name}</em></h4>
        <p><a href={info_url}>More info</a></p>
        <hr />
      </div>
    </>
  );
}
export default Mushroom;