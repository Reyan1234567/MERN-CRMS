import { NavLink } from "react-router-dom";
import "./Aside.css"
export default function Aside() {
  return (
    <aside className="aside">
      <nav>
        <ul>
          <li>
            <NavLink to="/dashboard" className={ ({ isActive }) => isActive ? "active white" : "white" }>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/drivers" className={ ({ isActive }) => isActive ? "active white" : "white" }>
              Drivers
            </NavLink>
          </li>
          <li>
            <NavLink to="/vehicles" className={ ({ isActive }) => isActive ? "active white" : "white" }>
              Vehicles
            </NavLink>
          </li>
          <li>
            <NavLink to="/booking" className={ ({ isActive }) => isActive ? "active white" : "white" }>
              Booking
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
