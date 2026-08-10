import { NavLink } from "react-router-dom";

export default function Headder() {
    return (
        <div className="headder">
            <NavLink  to="/"><img src="./src/assets/logo.png" alt="logo" /></NavLink>
            <nav className="navigationMenu">
                <NavLink  to="/">Home</NavLink>
                <NavLink to="/traveling">Traveling</NavLink>
                <NavLink to="/about">About Me</NavLink>
                <NavLink to="/contact">Contacts</NavLink>
            </nav>

        </div>
    )
}