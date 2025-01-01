import { NavLink } from "react-router-dom";
import "./Aside.css"
export default function Aside() {
  return (
    <aside className="aside">
      <nav>
        <ul>
          <li>
            <NavLink to="/" activeClassName="active">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/drivers" activeClassName="active">
              Drivers
            </NavLink>
          </li>
          <li>
            <NavLink to="/vehicles" activeClassName="active">
              Vehicles
            </NavLink>
          </li>
          <li>
            <NavLink to="/rentals" activeClassName="active">
              Rentals
            </NavLink>
          </li>
          <li>
            <NavLink to="/reports" activeClassName="active">
              Reports
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" activeClassName="active">
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
