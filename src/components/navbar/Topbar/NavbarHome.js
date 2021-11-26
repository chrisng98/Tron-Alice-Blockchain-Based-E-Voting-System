import './Navbar.css';
import { Link } from 'react-router-dom';

const NavbarHome = () => {
    return (
        <nav className="navbarout">
            <h1>TRON Alice Voting System</h1>
            <div className="links">
                <Link to ="/" style = {{
                    color: "white",
                    backgroundColor: 'coral',
                    borderRadius: '8px'
                }}>Home</Link>
            </div>
        </nav>
    );
}
 
export default NavbarHome;