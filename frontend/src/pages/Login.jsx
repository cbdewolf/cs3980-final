import React, { useState } from 'react'
import '../styles/login.css'
import NavBar from '../components/NavBar'

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

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
            const response = await fetch('http://127.0.0.1:8000/auth/login', {
                method:'POST',
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify({ username, password }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.detail || 'Login failed')
            }
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