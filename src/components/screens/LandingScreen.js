import NavbarLogin from "../navbar/Topbar/NavbarLogin";
import './LandingScreen.css';
import background from "../../Landing-page-image.jpeg";

const HomeScreen = () => {
    return (
        <>
        <NavbarLogin/>
        <div className="landing-screen">
            <img alt="landing" className="img" src={background}/>
        </div>
        </>
    );
}
 
export default HomeScreen;