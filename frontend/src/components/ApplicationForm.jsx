import React, {use, useState} from 'react'
import '../styles/application-form.css'

const ApplicationForm = ({ onSubmit, onCancel }) => {

    const [company, setCompany] = useState('')
    const [position, setPosition] = useState('')
    const [status, setStatus] = useState('Applied')

    const handleSubmit = (e) => {
        e.preventDefault()
        const application = {
            company,
            position,
            status,
            id: Date.now()
        }
        console.log(application)
        onSubmit(application)
    }


    return (
        <div className="app-form-container">
            <form className="application-form" onSubmit={handleSubmit}>
                <label>
                    Company Name:
                    <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
                </label>
                <label>
                    Position:
                    <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} />
                </label>
                <label>
                    Status:
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option >Applied</option>
                        <option >Interview</option>
                        <option >Offered</option>
                        <option >Rejected</option>
                    </select>
                </label>
                <div className="form-actions">
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
  )
}

export default ApplicationForm
