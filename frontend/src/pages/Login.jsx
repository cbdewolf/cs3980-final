import React, { useState, useContext } from 'react'
import '../styles/login.css'
import NavBar from '../components/NavBar'
import { useNavigate } from "react-router-dom";
import { UserContext } from '../contexts/UserContext';


const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { setToken } = useContext(UserContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        if (!username || !password) {
            setError('Please fill in all fields')
            setLoading(false)
            return
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/users/login', {
                method:'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    username,
                    password,
                }),
            })

            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.detail || 'Login failed')
            }
            setToken(data.access_token)
            localStorage.setItem("token", data.access_token)
            navigate("/dashboard")
            
        } catch(error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <NavBar />
            <div className="login-container">
                <div className="login-box">
                <h2 className="login-title">Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username </label>
                        <input 
                            type="text" 
                            id="username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password </label>
                        <input 
                            type="password" 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="form-input"
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                </div>
            </div>
        </>
    )
}

export default Login