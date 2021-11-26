import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./RegisterScreen.css";
import NavbarHome from "../navbar/Topbar/NavbarHome";

const RegisterScreen = ({ history }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [identitynumber, setIdentityNumber] = useState("");
    const [walletaddress, setWalletAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
  
    useEffect(() => {
      if(localStorage.getItem("authToken")) {
        if(localStorage.getItem("role")=== "user")
          history.push("/user");
          history.push("/admin");
      }
    },[history])

    const registerHandler = async (e) => {
      e.preventDefault();
  
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
  
      if (password !== confirmpassword) {
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          setError("");
        }, 5000);
        return setError("Passwords do not match");
      }
  
      try {
        if (email === 'admin@gmail.com') {
          localStorage.setItem("role", "admin");
        }else {
          localStorage.setItem("role", "user");
        }

        const { data } = await axios.post(
          "/api/auth/register",
          {
            username,
            identitynumber,
            email,
            walletaddress,
            password,
          },
          config
        );
  
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userInfo", JSON.stringify(data.user));
        const userInfo = localStorage.getItem("userInfo");
        console.log(userInfo);
        const role = localStorage.getItem("role");
        if(role === "user"){
          history.push("/user");
        }else {
          history.push("/admin");
        }

        console.log(role);
        
      } catch (error) {
        setError(error.response.data.error);
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
  
    return (
      <>
      <NavbarHome/>
      <div className="register-screen">
        <form onSubmit={registerHandler} className="register-screen__form">
          <h3 className="register-screen__title">Register</h3>
          {error && <span className="error-message">{error}</span>}
          <div className="form-group">
            <label htmlFor="name">Username:</label>
            <input
              type="text"
              required
              id="name"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="identitynumber">Identity Number:</label>
            <input
              type="text"
              required
              id="identitynumber"
              placeholder="Enter identity number"
              value={identitynumber}
              onChange={(e) => setIdentityNumber(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              required
              id="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">TronLink Wallet Address (TRC-20):</label>
            <input
              type="walletaddress"
              required
              id="walletaddress"
              placeholder="TRC-20 wallet address"
              value={walletaddress}
              onChange={(e) => setWalletAddress(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              required
              id="password"
              autoComplete="true"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmpassword">Confirm Password:</label>
            <input
              type="password"
              required
              id="confirmpassword"
              autoComplete="true"
              placeholder="Confirm password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
  
          <span className="register-screen__subtext">
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
      </>
    );
  };
  
  export default RegisterScreen;