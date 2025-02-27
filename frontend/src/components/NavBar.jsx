import { Link } from "react-router-dom";
import '../css/NavBar.css'


function NavBar(){
    return(
        <nav className="navbar">
            <div className="navbar-Brand">
                <Link to = "/">Film Vault</Link>
            </div>
            <div className="navbar-links">
                <Link to = "/">Home</Link>
                <Link to = "/">Profile</Link>
            </div>
        </nav>
    );
}

export default NavBar; 

