import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Aside from "./components/Aside";
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <div className="row">
        <Navbar />
      </div>

      <div className="d-flex flex-grow-1">
        <Aside/>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default App;





