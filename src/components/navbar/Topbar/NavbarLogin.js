import './NavbarLogin.css';
import { Link } from 'react-router-dom';

const NavbarLogin = () => {
    return (
        <nav className="navbar">
            <h1>TRON Alice Voting System</h1>
            <div className="links">
                <Link to ="/login" style = {{
                    color: "white",
                    backgroundColor: 'coral',
                    borderRadius: '8px'
                }} >Login</Link>
                <Link to ="/register" style = {{
                    color: "white",
                    backgroundColor: 'coral',
                    borderRadius: '8px'
                }} >Register</Link>
            </div>
            
        </nav>
    );
}
 
export default NavbarLogin;