import { NavLink } from "react-router-dom";
import Polo from "../../../../assets/images/Polo.png"
import "./Navbar.css"
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          <img
            alt="Polo logo"
            className="h-10 d-inline-block align-middle NAV"
            src={Polo}
            
          />
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">

            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



{/* <NavLink className="nav-link" to="/create">
Create Employee
</NavLink> */}








