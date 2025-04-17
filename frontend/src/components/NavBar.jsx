import React from 'react';
import '../styles/nav-bar.css';

export default function NavBar({ username = "Guest"}) {
    return (
        <nav className="navbar">
            <div className="nav-left">
                <span className="nav-item">Applications</span>
                <span className="nav-item">Companies</span>
            </div>
            <div className="nav-right">
                <span className='username'>{username}</span>
            </div>
        </nav>
    )
}
