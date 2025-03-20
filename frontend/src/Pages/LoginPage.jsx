import React, { useState, useEffect } from "react";
import "./Styles/LoginPage.css";
import Logo from "../assets/logo.png";
import axios from "axios";

const LoginPage = () => {
  const [nic, setNic] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  // Clear inputs on component mount (i.e., on page refresh)
  useEffect(() => {
    setNic("");
    setPassword("");
    setName("");
    setIsRegistering(false); // Optional: Reset to login mode on refresh
  }, []); // Empty dependency array ensures this runs only on mount

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = isRegistering ? "/api/register" : "/api/login";
      const response = await axios.post(`http://localhost:5000${endpoint}`, {
        nic,
        password,
        ...(isRegistering && { name }),
      });

      if (response.data.success) {
        alert(response.data.message);
        window.location.href = "/home";
      }
    } catch (err) {
      alert(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo">
          <img src={Logo} alt="BestVote Logo" />
        </div>
        <h2>Election Management System</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="nic"
              name="nic"
              placeholder="Enter NIC Number"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {isRegistering && (
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <a href="#" className="forgot-password">
            Forgot Password?
          </a>
          <button type="submit" className="login-btn">
            {isRegistering ? "Register" : "Login"}
          </button>
          <p className="register-link">
            {isRegistering ? (
              <a href="#" onClick={() => setIsRegistering(false)}>
                Already have an account? Login
              </a>
            ) : (
              <a href="#" onClick={() => setIsRegistering(true)}>
                {/* Don't have an account? Register */}
              </a>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;