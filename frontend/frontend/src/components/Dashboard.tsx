import React from "react";

export default function Dashboard() {
  return (
    <div className="container-fluid">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Dashboard</a>
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
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Reports</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Settings</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Summary Cards */}
      <div className="row">
        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <p className="card-text fs-4">1,234</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card text-white bg-success">
            <div className="card-body">
              <h5 className="card-title">Revenue</h5>
              <p className="card-text fs-4">$12,345</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card text-white bg-warning">
            <div className="card-body">
              <h5 className="card-title">Pending Orders</h5>
              <p className="card-text fs-4">45</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card text-white bg-danger">
            <div className="card-body">
              <h5 className="card-title">Issues</h5>
              <p className="card-text fs-4">3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Tables */}
      <div className="row">
        <div className="col-lg-8 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Sales Chart</h5>
              <p className="card-text">[Placeholder for a chart]</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Recent Activities</h5>
              <ul>
                <li>User John Doe signed up</li>
                <li>Order #1234 completed</li>
                <li>Revenue increased by $500</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
