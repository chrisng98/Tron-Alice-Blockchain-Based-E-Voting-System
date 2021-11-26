import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { SidebarData } from '../../navbar/Sidebar/SidebarData';
import "./PrivateScreen.css";

// Import React-Icons
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

// Import CSS
import '../../navbar/Sidebar/SideNavbar.css';
import '../../navbar/Topbar/Navbar.css';

class DashboardScreen extends React.Component {

  state = {
    title: "",
    body: "",
    posts: [],
    sidebar: false
  }

  componentDidMount = () => {
    this.getBlogPost();
  };

  getBlogPost = () => {
    axios.get('/api')
    .then((response) => {
      const data = response.data;
      this.setState({posts: data});
      console.log('Data has been received');
    })
    .catch(() => {
      console.log('Error retrieving data!');
      window.location.reload();
    });
  };

  displayBlogPost = (posts) => {
    if (!posts.length) return null;
  

    return (
      <table className='private-screen__table2'>
        <thead>
          <tr className = "private-screen__tabletitle">
            <th>Title</th>
            <th>Messages</th>
            <th>Created on</th>
          </tr>
        </thead>
        <tbody >
          {posts.map((post, index) => {
            return(
              <tr key ={index} className="private-screen__tabletitle">
                <th>{post.title}</th>
                <td>{post.body}</td>
                <td>{post.date}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

    );
  }
  
  render(){
    const logoutHandler = () => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("role");
      <Redirect to = "/login"/>
    }

    const showSidebarON = () => {
        this.setState({sidebar:true});
    }

    const showSidebarOFF = () => {
        this.setState({sidebar:false});
    }

    return(
      <>
      <IconContext.Provider value={{ color: 'black' }}>
    <nav className="navbarin">
        <div className='sidenavbar'>
          <Link to='#' className='sidemenu-bars'>
            <FaIcons.FaBars onClick={showSidebarON} />
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
        <nav className={this.state.sidebar ? 'sidenav-menu active' : 'sidenav-menu'}>
          <ul className='sidenav-menu-items' onClick={showSidebarOFF}>
            <li className='sidenavbar-toggle'>
              <Link to='#' className='sidemenu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
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
            <h1>Lastest Notification</h1>
            <br/>
            {this.displayBlogPost(this.state.posts)} 
          </div>
        </div>
        </>
    );
  }
}

export default DashboardScreen;