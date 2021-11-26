import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./LoginScreen.css";
import NavbarHome from "../navbar/Topbar/NavbarHome";

const LoginScreen = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    useEffect(() => {
      if(localStorage.getItem("authToken")) {
        if(localStorage.getItem("role")=== "user")
          history.push("/user");
          history.push("/admin");
      }
    },[history])

    const loginHandler = async (e) => {
      e.preventDefault();
  
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
  
      try {
        const { data } = await axios.post(
          "/api/auth/login",
          {
            email,
            password,
          },
          config
        );
        console.log(data);
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userInfo", JSON.stringify(data.user));

        if (email === 'admin@gmail.com') {
          localStorage.setItem("role", "admin");
        }else {
          localStorage.setItem("role","user")
        }
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
      <div className="login-screen">
        <form onSubmit={loginHandler} className="login-screen__form">
          <h3 className="login-screen__title">Login</h3>
          {error && <span className="error-message">{error}</span>}

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              required
              id="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              tabIndex ={1}
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
              tabIndex ={2}
            />
          </div>
         
          <button type="submit" className="btn btn-primary" tabIndex = {3}> 
            Login
          </button>

          <span className="login-screen__subtext">
            Do not have an account? <Link to="/register">Register</Link>
          </span>
          <span className="login-screen__forgotpassword">
            Forgot Password? <Link to = "/forgotpassword">Forgot Password</Link>
          </span>
        </form>
      </div>
      </>
    );
  };
  
  export default LoginScreen;