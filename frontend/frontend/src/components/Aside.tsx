import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Aside.css";

export default function Aside() {

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <aside className="aside">
      <nav>
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "active white" : "white"
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <button
              className={`nav-btn ${isDropdownOpen ? "active" : ""}`}
              onClick={() => setDropdownOpen(!isDropdownOpen)}
            >
              Expenses
              <span className={`chevron ${isDropdownOpen ? "open" : ""}`}>
                ▼
              </span>
            </button>
            {isDropdownOpen && (
              <ul className="dropdown">
                <li>
                  <NavLink
                    to="/timebound"
                    className={({ isActive }) =>
                      isActive ? "active white" : "white"
                    }
                  >
                    Time Bound
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/inventory"
                    className={({ isActive }) =>
                      isActive ? "active white" : "white"
                    }
                  >
                    Inventory
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <li>
            <NavLink
              to="/employees"
              className={({ isActive }) =>
                isActive ? "active white" : "white"
              }
            >
              Employees
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/drivers"
              className={({ isActive }) =>
                isActive ? "active white" : "white"
              }
            >
              Drivers
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/vehicles"
              className={({ isActive }) =>
                isActive ? "active white" : "white"
              }
            >
              Vehicles
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/booking"
              className={({ isActive }) =>
                isActive ? "active white" : "white"
              }
            >
              Booking
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/inspection"
              className={({ isActive }) =>
                isActive ? "active white" : "white"
              }
            >
              Inspection
            </NavLink>
          </li>
        </ul>
      </nav>
      <Link to="/"><button className="btn btn-primary">Logout</button></Link>
      
    </aside>
  );
}
