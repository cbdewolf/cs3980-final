import React from 'react';
import '../styles/nav-bar.css';
import { Link } from 'react-router-dom';


// the user will evnetually fetched from backend to get the user who is logged in
export default function NavBar({ username = "Guest"}) {
    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/dashboard" className="nav-item">Applications</Link>
                <Link to="/companies" className="nav-item">Companies</Link>
                <Link to="/reminders" className="nav-item">Reminders</Link>
            </div>
            <div className="nav-right">
                <Link to="/userhome" className="username">{ username }</Link>
            </div>
        </nav>
    )
}
