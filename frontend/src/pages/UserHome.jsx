import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import '../styles/user-home.css'
import { useNavigate } from 'react-router-dom'

export default function UserHome() {
    const [user, setUser] = useState(null);
    //const [loading, setLoading] = useState(true);
    const navigate = useNavigate()


    useEffect(() => {
      const fetchUser = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await fetch("http://127.0.0.1:8000/api/users/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (!res.ok) throw new Error("Failed to fetch user profile");
          const data = await res.json();
          setUser(data);
        } catch (err) {
          console.error(err);
        } 
      };
  
      fetchUser();
    }, [navigate]);

    if (!user){
        return (
            <>
                <NavBar username="New? Click Here to Register!"/>
                <div className="user-profile-container">
                <h2>Please Login or create a User to Continue</h2>
                <p>
                    <a href="/register">New? Click here to register!</a>
                </p>
                <p>
                    <a href="/login">Already have an account! Login here!</a>
                </p>
                </div>
            </>
        );
    }

    return (
        <>
            <NavBar username={user.username}/>
            <div className="user-profile-container">
                <div className="user-profile-card">
                    {user.profile_pic && (
                        <img src={user.profile_pic} alt="Profile" className="user-profile-pic" />
                    )}
                    <h2>{user.username}</h2>
                    <p><strong>User ID:</strong> {user.user_id}</p>
                    <p><strong>Position:</strong> {user.position}</p>
                    <p><strong>School:</strong> {user.school}</p>
                    <p><strong>Major:</strong> {user.major}</p>
                    <p><strong>Bio:</strong> {user.bio}</p>
                </div>
            </div>
        </>
    )
}