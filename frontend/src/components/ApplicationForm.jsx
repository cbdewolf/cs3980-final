import React, {use, useState} from 'react'
import '../styles/application-form.css'

const ApplicationForm = ({ onSubmit, onCancel, initialValues = {}}) => {

    const [company, setCompany] = useState(initialValues.company || '')
    const [position, setPosition] = useState(initialValues.position || '')
    const [status, setStatus] = useState(initialValues.status || 'Applied')
    const [notes, setNotes] = useState(initialValues.notes || '')
    // const [dateApplied, setDateApplied] = useState(initialValues.dateApplied || '')
    // add a date picker here soon im too lazy rn

    const handleSubmit = (e) => {
        e.preventDefault()
        const today = new Date().toISOString().split('T')[0]
        const application = {
            company,
            position,
            status,
            date_applied: initialValues.dateApplied || today,
            notes,
            _id: initialValues._id
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
                <label>
                    Notes:
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Optional notes about this application..."
                    />
                </label>
                <div className="form-actions">
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
  )
}

export default ApplicationForm
