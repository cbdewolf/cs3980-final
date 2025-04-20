import React from 'react';
import '../styles/application-table.css';
import '../styles/edit-application.css';
import '../styles/delete-application.css';

export default function ApplicationTable({ applications, onEditClick, onDeleteClick }) {
    if (!applications.length) {
        return <p className="no-apps-msg">No applications yet.</p>
    }

    return (
        <table className="application-table">
            <thead>
                <tr>
                    <th>Company</th>
                    <th>Position</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {applications.map((app) => (
                    <tr key={app.id}>
                        <td>{app.company}</td>
                        <td>{app.position}</td>
                        <td>{app.status}</td>
                        <td className="action-buttons">
                            <button 
                                className="edit-btn" 
                                onClick={() => onEditClick(app)}
                            >
                                Edit
                            </button>
                            <button 
                                className="delete-btn" 
                                onClick={() => onDeleteClick(app)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}