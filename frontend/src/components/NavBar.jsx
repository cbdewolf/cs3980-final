import React, { useContext } from 'react';
import '../styles/nav-bar.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

// the user will evnetually fetched from backend to get the user who is logged in
export default function NavBar() {

    const { user, logout } = useContext(UserContext);

    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/dashboard" className="nav-item">Applications</Link>
                <Link to="/companies" className="nav-item">Companies</Link>
                <Link to="/reminders" className="nav-item">Reminders</Link>
            </div>
            <div className="nav-right">
                <button onClick={logout} className="logout">Logout</button>
                <Link to="/userhome" className="username">{ user?.username || "New? Click Here to Register!"}</Link>
            </div>
        </nav>
    )
}
