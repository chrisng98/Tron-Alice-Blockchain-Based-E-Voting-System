import './Navbar.css';
import { Link } from 'react-router-dom';

const NavbarForgotPassword = () => {
    return (
        <nav className="navbarout">
            <h1>TRON Alice Voting System</h1>
            <div className="links">
                <Link to ="/" style = {{
                    color: "white",
                    backgroundColor: 'coral',
                    borderRadius: '8px'
                }} >Home</Link>
                <Link to ="/login" style = {{
                    color: "white",
                    backgroundColor: 'coral',
                    borderRadius: '8px'
                }} >Login</Link>
            </div>
            
        </nav>
    );
}
 
export default NavbarForgotPassword;