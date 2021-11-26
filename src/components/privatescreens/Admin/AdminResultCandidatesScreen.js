import React from 'react';
import { Redirect } from 'react-router-dom';

// Voting Screen
import Utils from '../../../utils/smartContract';
import TronWeb from 'tronweb';
import Content from '../../resultCandidates/Content';


import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import { AdminSidebarData } from '../../navbar/Sidebar/AdminSidebarData';
import '../../navbar/Sidebar/SideNavbar.css';
import '../../navbar/Topbar/Navbar.css';

const FOUNDATION_ADDRESS = 'TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg';

class AdminVoteScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
          candidates:[],
          hasVoted: false,
          loading: false,

          tronWeb: {
              installed: false,
              loggedIn: false
          },

          sidebar: false
        }
  }

  async componentDidMount() {
      this.setState({loading:true})
      await new Promise(resolve => {
        const tronWebState = {
            installed: !!window.tronWeb,
            loggedIn: window.tronWeb && window.tronWeb.ready
        };

        if(tronWebState.installed) {
            this.setState({
                tronWeb:
                tronWebState
            });

            return resolve();
        }

        let tries = 0;

        const timer = setInterval(() => {
            if(tries >= 10) {
                const TRONGRID_API = 'https://api.trongrid.io';

                window.tronWeb = new TronWeb(
                    TRONGRID_API,
                    TRONGRID_API,
                    TRONGRID_API
                );

                this.setState({
                    tronWeb: {
                        installed: false,
                        loggedIn: false
                    }
                });

                clearInterval(timer);
                return resolve();
            }

            tronWebState.installed = !!window.tronWeb;
            tronWebState.loggedIn = window.tronWeb && window.tronWeb.ready;

            if(!tronWebState.installed)
                return tries++;

            this.setState({
                tronWeb: tronWebState
            });

            resolve();
        }, 100);
    });

    if(!this.state.tronWeb.loggedIn) {
        // Set default address (foundation address) used for contract calls
        // Directly overwrites the address object as TronLink disabled the
        // function call
        window.tronWeb.defaultAddress = {
            hex: window.tronWeb.address.toHex(FOUNDATION_ADDRESS),
            base58: FOUNDATION_ADDRESS
        };

        window.tronWeb.on('addressChanged', () => {
            if(this.state.tronWeb.loggedIn)
                return;

            this.setState({
                tronWeb: {
                    installed: true,
                    loggedIn: true
                }
            });
        });
    }
    await Utils.setTronWeb(window.tronWeb);
    this.fetchData();
    this.startEventListener();
    this.setState({loading:false})
  }

    startEventListener(){
    Utils.contract.eventVote().watch((err) => {
      if(err){
      return console.log('Failed to bind the event', err);
      }else{
        return window.location.reload();
      }
    });
    }

  async fetchData(){
      const CandidateCount = (await Utils.contract.candidatecount().call()).toNumber();
      console.log('CandidateCount', CandidateCount);

      for(var i=1; i<=CandidateCount; i++){

          const candidate_tmp = await Utils.contract.candidates(i).call();
          console.log('candidate_tmp', candidate_tmp);

          const candidates = [...this.state.candidates];

          candidates.push({
                          id: candidate_tmp.id.toNumber(),
                          name: candidate_tmp.name,
                          voteCount: candidate_tmp.voteCount.toNumber()
          });

          this.setState({candidates:candidates})
      }
  }

  render() {
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
  
      return this.state.error ? (
          <span className="error-message">{this.state.error}</span>
        ) : (
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
            <div className='private-screen'>
              <div>
                    <h1 style ={{textAlign: 'center'}}>DAPP Election Results</h1>
                    <br/>
                {this.state.loading
                  ? <p className='text-center'>Loading...</p>
                  : <Content
                      candidates={this.state.candidates}
                      hasVoted={this.state.hasVoted}
                      castVote={this.voteCandidate} />
                }
              </div>
            </div>
          </>
      );
  };
};

export default AdminVoteScreen;
 