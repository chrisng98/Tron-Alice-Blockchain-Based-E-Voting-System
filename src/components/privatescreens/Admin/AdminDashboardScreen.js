import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AdminSidebarData } from '../../navbar/Sidebar/AdminSidebarData';

// Import React-Icons
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

// Import CSS
import '../../navbar/Sidebar/SideNavbar.css';
import '../../navbar/Topbar/Navbar.css';
import "../User/PrivateScreen.css";

class AdminDashboardScreen extends React.Component {

  state = {
    title: "",
    body: "",
    posts: [],

    error: "",
    privateData: "",
    sidebar: false
  }

  componentDidMount = () => {
    this.getNote();
  };

  getNote = () => {
    axios.get('/api')
    .then((response) => {
      const data = response.data;
      this.setState({posts: data});
      console.log('Data has been received');
      console.log(this.state.posts)
    })
    .catch(() => {
      console.log('Error retrieving data!');
      window.location.reload();
    });
  };

  handleChange = ({target}) => {
    const {name, value} = target;

    this.setState({[name]: value})
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title: this.state.title,
      body: this.state.body
    };

    axios({
      url: '/api/save',
      method: 'POST',
      data: payload
    })
    .then(() => {
      console.log('Data has been sent to the server');
      this.resetUserInputs();
      this.getNote();
    }).catch(() => {
      console.log('Internal server error');
    })
  };

  handleDelete = (id) => {
    if(window.confirm("Are you sure?")){;
    axios({
      url: `/api/delete/${id}`,
      method: 'DELETE'
    }).then(()=> {
      console.log('Data has been deleted');
      window.location.reload();
    }).catch(()=> {
      console.log('Internal Server Error');
    })
    }
  };

  handleEdit = async(id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const {data} = await axios.get(
    `/api/${id}`, config
    )

    localStorage.setItem("targetNote", JSON.stringify(data.note));
    window.location.href = `/admin/dashboard/${id}`
  }

  resetUserInputs = () => {
    this.setState ({
      title: '',
      body: ''
    })
  };

  displayNote = (posts) => {
    if (!posts.length) return null;

    return (
      <table className='private-screen__table2'>
        <thead>
          <tr className = "private-screen__tabletitle">
            <th>Title</th>
            <th>Messages</th>
            <th>Created on</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody >
          {posts.map((post, index) => {
            return(
              <tr key ={index} className="private-screen__tabletitle">
                <th>{post.title}</th>
                <td>{post.body}</td>
                <td>{post.date}</td>
                <td>
                    <button onClick = {() =>this.handleEdit(post._id)}> 
                    Edit
                  </button>
                    <button onClick={()=>this.handleDelete(post._id)}>
                    Delete
                  </button>
                </td>
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
      localStorage.removeItem("targetNote");
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
          <h1 style={{textAlign:"center"}}>New Notification</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group" style= {{borderStyle: "solid",borderRadius:"10px", borderWidth:"1px"}}>
              <h3 style={{paddingLeft:"15px"}}>Title: </h3>
              <input
                type = "text"
                name = "title"
                value = {this.state.title}
                placeholder = "Title"
                onChange ={this.handleChange}
              />
            </div>
            <div className="form-group" style= {{borderStyle: "solid",borderRadius:"10px", borderWidth:"1px", width:"600px", height:"200px"}}>
            <h3 style={{paddingLeft:"15px"}}>Messages: </h3>
            <textarea style= {{borderStyle: "none", width:"598px", height:"150px", backgroundColor: "#eee", outline:"none", fontSize:"1rem", paddingLeft:"20px", paddingRight:"20px"}}
                name = "body"
                value = {this.state.body}
                placeholder = "Message"
                onChange ={this.handleChange}
                />
            </div>
      
            <button className="btn btn-primary" style={{borderRadius: "5px"}}>Submit</button>
          </form>
          
          <br/>
          <h1>Messages Posted: </h1>
          {this.displayNote(this.state.posts)}
        </div>
      </div>
      </>
    );
  }

}


export default AdminDashboardScreen;
