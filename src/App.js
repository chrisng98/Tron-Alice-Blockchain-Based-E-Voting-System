import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// Private Routing
import PrivateRoute from './components/routing/PrivateRoute';

// Public Screen
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import ForgotPasswordScreen from './components/screens/ForgotPasswordScreen';
import ResetPasswordScreen from './components/screens/ResetPasswordScreen';
import LandingScreen from './components/screens/LandingScreen';

// Private Screen
import PrivateScreen from './components/privatescreens/User/PrivateScreen';
import AdminPrivateScreen from './components/privatescreens/Admin/AdminPrivateScreen';
import AdminDashboardScreen from './components/privatescreens/Admin/AdminDashboardScreen';
import AdminUpdateDashboardScreen from './components/privatescreens/Admin/AdminUpdateDashboardScreen';
import AdminSupportScreen from './components/privatescreens/Admin/AdminSupportScreen';
import AdminAddCandidatesScreen from './components/privatescreens/Admin/AdminAddCandidatesScreen';
import AdminResultCandidatesScreen from './components/privatescreens/Admin/AdminResultCandidatesScreen';
import ProfileScreen from './components/privatescreens/User/ProfileScreen';
import EditProfileScreen from './components/privatescreens/User/EditProfileScreen';
import VoteScreen from './components/privatescreens/User/VoteScreen';
import SupportScreen from './components/privatescreens/User/SupportScreen';
import DashboardScreen from './components/privatescreens/User/DashboardScreen';


// Voting Screen
import TronLinkGuide from './components/TronLinkGuide';
import TronWeb from 'tronweb';
import Utils from './utils/smartContract';

const FOUNDATION_ADDRESS = 'TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg';

class App extends React.Component {

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
}


render() {
    if(!this.state.tronWeb.installed)
        return <TronLinkGuide />;

    if(!this.state.tronWeb.loggedIn)
        return <TronLinkGuide installed />;

    return (      
        <Router>
          <div className="app">
            <Switch>
              <Route exact path = "/" component = {LandingScreen} />
              <Route exact path = "/login" component = {LoginScreen}/>
              <Route exact path = "/register" component = {RegisterScreen}/>
              <Route exact path = "/forgotpassword" component = {ForgotPasswordScreen}/>
              <Route exact path = "/passwordreset/:resetToken" component = {ResetPasswordScreen}/>
              <PrivateRoute exact path = "/user" component = {PrivateScreen}/>
              <PrivateRoute exact path = "/user/dashboard" component = {DashboardScreen}/>
              <PrivateRoute exact path = "/user/profile" component = {ProfileScreen}/>
              <PrivateRoute exact path = "/user/profile/edit" component = {EditProfileScreen}/>
              <PrivateRoute exact path = "/user/vote" component = {VoteScreen}/>
              <PrivateRoute exact path = "/user/support" component = {SupportScreen}/>
              <PrivateRoute exact path = "/admin" component = {AdminPrivateScreen}/>
              <PrivateRoute exact path = "/admin/dashboard" component = {AdminDashboardScreen}/>
              <PrivateRoute exact path = "/admin/dashboard/:id" component = {AdminUpdateDashboardScreen}/>
              <PrivateRoute exact path = "/admin/addcandidates" component = {AdminAddCandidatesScreen}/>
              <PrivateRoute exact path = "/admin/result" component = {AdminResultCandidatesScreen}/>
              <PrivateRoute exact path = "/admin/support" component = {AdminSupportScreen}/>
            </Switch>
          </div>
        </Router>
    )
  }
}

export default App;

