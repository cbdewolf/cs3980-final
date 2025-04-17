import React from 'react'
import '../styles/add-new-application.css'

export default function AddNewApplication({ onClick }) {
    return (
        <button className="add-new-application" onClick={onClick}>
            + Add New Application
        </button>
    )
}