import { Link } from 'react-router-dom';
import { useState} from "react";
import { SidebarData } from '../../navbar/Sidebar/SidebarData';

// Import React-Icons
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

// Import CSS
import '../../navbar/Sidebar/SideNavbar.css';
import '../../navbar/Topbar/Navbar.css';

const SupportScreen = ({history}) => {
const [sidebar, setSidebar] = useState(false);
const showSidebar = () => setSidebar(!sidebar);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("role");
    history.push("/login");
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
    <div style={{padding: "1% 3% 1% 3%"}}>
        <h1>What is TRON Alice Voting System?</h1>
        <p>
        TRON Alice E-Voting System is a hybrid blockchain-based e-voting application which developed by using the technology of Web 2.0 and 3.0. It offers their users to vote using the implemented smart contract that is embedded on the TRON Blockchain network where all result of voting data is stored in a decentralized distributed manner.
        </p>
        <br/>
        <h1>What should you use us?</h1>
        <p>
        In a modern democracy, the fairness and openness of voting is a topic of greatest concern to electors today. Even the world’s leading democratic countries like India and United Stated still suffer from a flawed conventional voting system. The conventional voting system such as the traditional voting system and the electronic voting system of today is typically required a centralized authority to realize the whole voting process. All the voting results will be stored in the centralized database of the authority who in-charged in the voting process, thus leading to the concern of a large scale of manipulating the voting result. An occurrence of centralized authority has decided the problem of transparency, trust, privacy, expensive cost, immunity, and fraud will exist in the conventional voting process.
        Therefore, TRON Alice Voting System was introduced and aims to solve the above issues. TRON Alice Voting System has the characteristics of correctness, robustness, double voting avoided, fairness, safe and verifiable when used for elections. Each of the transactions will be recorded on the TRON blockchain which is irreversible and fully transparent. In another word, it is nearly impossible to manipulate the voting results.
        </p>
    </div>
    </>
  );
};

export default SupportScreen;