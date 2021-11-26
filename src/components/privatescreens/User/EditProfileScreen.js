import { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { SidebarData } from '../../navbar/Sidebar/SidebarData';

// Import React-Icons
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

// Import CSS
import '../../navbar/Sidebar/SideNavbar.css';
import '../../navbar/Topbar/Navbar.css';

import "../../screens/RegisterScreen.css";


const ProfileScreen = ({ history }) => {
    const userInfoFromStorage = JSON.parse(localStorage.getItem("userInfo"));
    const [username, setUsername] = useState(userInfoFromStorage.username);
    const [email, setEmail] = useState(userInfoFromStorage.email);
    const [identitynumber, setIdentityNumber] = useState(userInfoFromStorage.identitynumber);
    const [walletaddress, setWalletAddress] = useState(userInfoFromStorage.walletaddress);
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    const logoutHandler = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("role");
    history.push("/login");
    }

    const updateHandler = async (e) => {
      e.preventDefault();

      if (password !== confirmpassword) {
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          setError("");
        }, 5000);
        return setError("Passwords do not match");
      }
  

      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        },
      };
      
      try {
        const { data } = await axios.put(
          `/api/auth/user/update/${userInfoFromStorage._id}`,
          {
            username,
            identitynumber,
            email,
            walletaddress,
            password
          },
          config
        );
        localStorage.setItem("userInfo", JSON.stringify(data.updatedUser));
        
        history.push("/user/profile");
        window.alert("All information is updated");
      } catch (error) {
        setError(error.response.data.error);
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
  
    return (
      <>
        <IconContext.Provider value={{ color: 'black' }}>
        <nav className="navbarin">
            <div className='sidenavbar'>
              <Link to='#' className='sidemenu-bars'>
                <FaIcons.FaBars onClick={showSidebar} />
              </Link>
            </div>
            <h1>TRON Alice Voting System</h1>
            <div className="links">
                <button onClick = {logoutHandler} style = {{
                    color: 'white',
                    fontSize: '15px',
                    backgroundColor: 'coral',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px',
                }}>Logout</button>
            </div>
        </nav>
            <nav className={sidebar ? 'sidenav-menu active' : 'sidenav-menu'}>
              <ul className='sidenav-menu-items' onClick={showSidebar}>
                <li className='sidenavbar-toggle'>
                  <Link to='#' className='sidemenu-bars'>
                    <AiIcons.AiOutlineClose />
                  </Link>
                </li>
                {SidebarData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link exact to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
        </IconContext.Provider>
      <div className="register-screen">
        <form onSubmit={updateHandler} className="register-screen__form">
          <h3 className="register-screen__title">Edit Details</h3>
          {error && <span className="error-message">{error}</span>}
          <div className="form-group">
            <label htmlFor="name">Username:</label>
            <input
              type="text"
              required
              id="name"
              placeholder="Enter Username"
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
              placeholder="Enter Identity Number"
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
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="walletaddress">TronLink Wallet Address (TRC-20):</label>
            <input
              type="walletaddress"
              required
              id="walletaddress"
              placeholder="Enter TRC-20 wallet address"
              value={walletaddress}
              onChange={(e) => setWalletAddress(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Confirm
          </button>
        </form>
      </div>
      </>
    );
  };
  
  export default ProfileScreen;