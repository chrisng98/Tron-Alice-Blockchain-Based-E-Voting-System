import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { AdminSidebarData } from './AdminSidebarData';
import './SideNavbar.css';
import { IconContext } from 'react-icons';
import '../../navbar/Topbar/Navbar.css';
import { Redirect } from 'react-router-dom';

const AdminSideNavbar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const logoutHandler = () => {
      localStorage.removeItem("authToken");
      <Redirect to = "/login"/>
  }

  return (
    <>
      <IconContext.Provider value={{ color: 'black' }}>
        <div className='sidenavbar'>
          <Link to='#' className='sidemenu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
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
        </div>
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
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default AdminSideNavbar;