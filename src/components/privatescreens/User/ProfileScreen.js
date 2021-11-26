import { useState } from "react";
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
    const username = userInfoFromStorage.username;
    const email = userInfoFromStorage.email;
    const identitynumber = userInfoFromStorage.identitynumber;
    const walletaddress = userInfoFromStorage.walletaddress;
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    const logoutHandler = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("role");
    history.push("/login");
    }

    const submitHandler = (e) => {
        e.preventDefault();
        history.push("/user/profile/edit");
    }
  
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
        <form onSubmit= {submitHandler} className="register-screen__form">
          <h3 className="register-screen__title">User Profile</h3>
          <div className="form-group">
            <label htmlFor="name">Username:</label>
            <input
              type="text"
              id="name"
              disabled
              value={username}
            />
          </div>
          <div className="form-group">
            <label htmlFor="identitynumber">Identity Number:</label>
            <input
              type="text"
              disabled
              id="identitynumber"
              value={identitynumber}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              disabled
              id="email"
              value={email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="walletaddress">TronLink Wallet Address (TRC-20):</label>
            <input
              type="walletaddress"
              disabled
              id="walletaddress"
              value={walletaddress}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Edit Details
          </button>
        </form>
      </div>
      </>
    );
  };
  
  export default ProfileScreen;