import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    userID: "",
    password: "",
    role: "user", // Default role
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  async function onSubmit(e: any) {
    e.preventDefault();
    const register = { ...form };

    try {
      const response = await fetch(`http://localhost:8080/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(register),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "An error occurred during registration.");
        return;
      }

      // Registration successful, reset form and navigate to login
      setErrorMessage(null);
      setForm({
        userID: "",
        password: "",
        role: "user",
      });
      navigate("/");
    } catch (error) {
      setErrorMessage("Failed to register. Please try again.");
      console.error("Error during registration:", error);
    }
  }

  function updateForm(value: any) {
    setForm((prev) => ({ ...prev, ...value }));
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="userID" className="form-label">User ID</label>
            <input
              type="text"
              id="userID"
              name="userID"
              className="form-control"
              placeholder="Enter your User ID"
              value={form.userID}
              onChange={(e) => updateForm({ userID: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => updateForm({ password: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Role</label>
            <input
              type="text"
              id="role"
              name="role"
              className="form-control"
              value={form.role}
              readOnly // Prevents editing
            />
          </div>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;



