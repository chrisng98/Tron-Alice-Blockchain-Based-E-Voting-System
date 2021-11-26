import { useState, useEffect } from "react";
import axios from "axios";
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import { AdminSidebarData } from '../../navbar/Sidebar/AdminSidebarData';
import '../../navbar/Sidebar/SideNavbar.css';
import '../../navbar/Topbar/Navbar.css';
import background from '../../../Welcome-image.jpeg';
import './AdminPrivateScreen.css';

const AdminPrivateScreen = ({ history }) => {
  const [error, setError] = useState("");
  const [adminprivateData, setAdminPrivateData] = useState("");
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const userInfoFromStorage = JSON.parse(localStorage.getItem("userInfo"));
  const username = userInfoFromStorage.username;

  useEffect(() => {

    if(!localStorage.getItem("authToken")) {
      history.push("/login");
    }

    const fetchPrivateData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/private/admin", config);
        setAdminPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized! Please login");
      }
    };

    fetchPrivateData();
  }, [history]);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("role");
    history.push("/login");
  }

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <>
    <div style = {{ background: "green", color: "white"}}>{adminprivateData}{username}</div>
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
                padding: '5px',
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
            {AdminSidebarData.map((item, index) => {
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
    <div>
            <img alt="logged in" className="img" src={background}/>
           
      </div>
      
    </>
  );
};

export default AdminPrivateScreen;