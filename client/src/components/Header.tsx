import { Link } from "react-router-dom";

const Header = () => {
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
          <Link to="/">Sign out</Link>
        </nav>
      </div>
      <hr />

    </>
  )
}
export default Header;