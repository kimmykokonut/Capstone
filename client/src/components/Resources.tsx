import { Link } from "react-router-dom";

const Resources = () => {
  return (
    <>
    <h1>OMS Resource List</h1>
    <h2>Mushroom foraging regulations/permits</h2>
    <p>Campgrounds</p>
    <p>Portland</p>
    <p>State</p>
    <p>Federal</p>
    <Link to="/resources/checklist">Foraging checklist</Link>
    </>
  )
}
export default Resources;