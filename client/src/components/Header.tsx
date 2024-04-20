import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signOut } from "../api-helper";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('An error occurred:', error)
    }
  };

  return(
    <>
      <div id="header">
        <h1>oms field trips header</h1>
        <nav id="nav">
          <Link to="/dashboard">dashboard</Link>
          <br />
          <Link to="/trips">trips</Link>
          <br />
          <Link to="/resources">resources</Link>
          <br />
          {/* maybe add username if signed in? */}
          <button onClick={handleLogout}>Sign out</button>
        </nav>
      </div>
      <hr />

    </>
  )
}
export default Header;