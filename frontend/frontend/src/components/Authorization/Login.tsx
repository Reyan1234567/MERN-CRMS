import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ userID: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  async function fetchData() {
    try {
      const response = await fetch("http://localhost:8080/api/login",{
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        console.error(`Error: HTTP status ${response.status}`);
        return;
      }
      const data = await response.json();
      const accessToken = data.accessToken;
      localStorage.setItem("authToken", accessToken);

      console.log("Access token saved successfully:", accessToken);
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
  }
  fetchData()

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrorMessage(""); 

    if (!form.userID || !form.password) {
      setErrorMessage("Both fields are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Something went wrong!");
        return;
      }

      const { accessToken } = await response.json();
      localStorage.setItem("accessToken", accessToken); // Store token for authenticated routes
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card p-4 shadow"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Enter your username"
              value={form.userID}
              onChange={(e: any) =>
                setForm({ ...form, userID: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e: any) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <Link to={"/register"}>
          <button className="btn btn-outline-secondary mt-2 w-100">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;

