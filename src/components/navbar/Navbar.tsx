import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import classes from './navbar.module.css';

export default function Navbar() {
    const { pathname } = useLocation();
    return (
        <nav>
            <ul>
                <li><Link to="/" className={`${classes.link} ${pathname === "/" ? classes.active : ""}`}>Home</Link></li>
                <li><Link to="/experience" className={`${classes.link} ${pathname === "/experience" ? classes.active : ""}`}>Experience</Link></li>
                <li><Link to="/projects" className={`${classes.link} ${pathname === "/projects" ? classes.active : ""}`}>Projects</Link></li>
                <li><Link to="/about" className={`${classes.link} ${pathname === "/about" ? classes.active : ""}`}>About</Link></li>
                <li><Link to="/contact" className={`${classes.link} ${pathname === "/contact" ? classes.active : ""}`}>Contact</Link></li>
            </ul>
        </nav>
    );
}