import React, { useContext } from 'react'
import NavBar from '../components/NavBar'
import '../styles/user-home.css'
import { UserContext } from '../contexts/UserContext'

export default function UserHome() {
    const { user } = useContext(UserContext)

    return (
          <>
          <NavBar />
          <div className="user-profile-container">
            {user ? (
              <div className="user-profile-card">
                {user.profile_pic && (
                  <img src={user.profile_pic} alt="Profile" className="user-profile-pic" />
                )}
                <h2>{user.username}</h2>
                <p><strong>Position:</strong> {user.position}</p>
                <p><strong>School:</strong> {user.school}</p>
                <p><strong>Major:</strong> {user.major}</p>
                <p><strong>Bio:</strong> {user.bio}</p>
              </div>
            ) : (
              <div className="user-profile-card">
                <h2>Please log in or create an account</h2>
                <p><a href="/register">New? Click here to register!</a></p>
                <p><a href="/login">Already have an account? Login here!</a></p>
              </div>
            )}
          </div>
        </>
    )
}