import React, { useContext } from 'react';
import '../styles/nav-bar.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

export default function NavBar() {
    const { user, logout } = useContext(UserContext);

    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/dashboard" className="nav-item">Applications</Link>
                <Link to="/companies" className="nav-item">Companies</Link>
                <Link to="/reminders" className="nav-item">Reminders</Link>
                {user && user.is_admin && (
                    <Link to="/admin" className="nav-item admin-link">Admin Panel</Link>
                )}
            </div>
            <div className="nav-right">
                {user ? (
                    <>
                        <button onClick={logout} className="logout">Logout</button>
                        <Link to="/userhome" className="username">{user.username}</Link>
                    </>
                ) : (
                    <Link to="/register" className="username">New? Click here to Register!</Link>
                )}
            </div>
        </nav>
    )
}