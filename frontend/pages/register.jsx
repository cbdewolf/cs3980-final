import React, { useState } from 'react'
import '../styles/register.css'

const Register = () => {

    const [username, setUsername] = useState('')
    const [confirmUsername, setConfirmUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        if (!username || !password || !confirmUsername || !confirmPassword) {
            setError('Please fill in all fields')
            setLoading(false)
            return
        }

        if (username !== confirmUsername) {
            setError('Usernames do not match')
            setLoading(false)
            return
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            setLoading(false)
            return
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/auth/register', {
                method:'POST',
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify({ username, password }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.detail || 'Registration failed')
            }
        } catch(error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="register-container">
            <div className="register-box">
            <h2 className="register-title">Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
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
                    <label htmlFor="confirmUsername">Confirm Username </label>
                    <input 
                        type="text" 
                        id="confrimUsername" 
                        value={confirmUsername} 
                        onChange={(e) => setConfirmUsername(e.target.value)} 
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
                <div className="form-group">
                    <label htmlFor="confrimPassword">Confirm Password </label>
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        className="form-input"
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="login-button" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
            </div>
        </div>
    )    
}

export default Register