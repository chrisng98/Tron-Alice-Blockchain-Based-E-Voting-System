import { useState } from "react";
import axios from "axios";
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import { AdminSidebarData } from '../../navbar/Sidebar/AdminSidebarData';
import '../../navbar/Sidebar/SideNavbar.css';
import '../../navbar/Topbar/Navbar.css';
import './AdminPrivateScreen.css';

const AdminUpdateDashboardScreen = ({ history, match }) => {
  const targetNoteFromStorage = JSON.parse(localStorage.getItem("targetNote"));
  const [error, setError] = useState("");
  const [title, setTitle] = useState(targetNoteFromStorage.title);
  const [body, setBody] = useState(targetNoteFromStorage.body);
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const updateHandler = async (e) => {
      e.preventDefault();

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      
      try {
        axios.put(
          `/api/${match.params.id}`,
          {
            title,
            body
          },
          config
        );
        window.location.href = "/admin/dashboard";
        localStorage.removeItem("targetNote");
        
      } catch (error) {
        setError(error.response.data.error);
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("role");
    localStorage.removeItem("targetNote");
    history.push("/login");
  }

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
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
            {AdminSidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path} exact = "true">
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        </IconContext.Provider>
      <div className="private-screen">
        <div>
          <h1 style={{textAlign:"center"}}>Edit Notification</h1>
          <form onSubmit={updateHandler}>
            <div className="form-group" style= {{borderStyle: "solid",borderRadius:"10px", borderWidth:"1px"}}>
              <h3 style={{paddingLeft:"15px"}}>Title: </h3>
              <input
                type = "text"
                name = "title"
                value = {title}
                placeholder = "Title"
                onChange ={(e)=> setTitle(e.target.value)}
              />
            </div>
            <div className="form-group" style= {{borderStyle: "solid",borderRadius:"10px", borderWidth:"1px", width:"600px", height:"200px"}}>
            <h3 style={{paddingLeft:"15px"}}>Messages: </h3>
            <textarea style= {{borderStyle: "none", width:"598px", height:"150px", backgroundColor: "#eee", outline:"none", fontSize:"1rem", paddingLeft:"20px", paddingRight:"20px"}}
                name = "body"
                value = {body}
                placeholder = "Enter Messages"
                onChange ={(e)=> setBody(e.target.value)}
                />
            </div>
      
            <button className="btn btn-primary" style={{borderRadius: "5px"}}>Submit</button>
          </form>
        </div>
      </div>
      </>
    );
  };

export default AdminUpdateDashboardScreen;