import React from 'react';
import '../styles/application-table.css';

export default function ApplicationTable({ applications }) {
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
                </tr>
            </thead>
            <tbody>
                {applications.map((app) => (
                    <tr key={app.id}>
                        <td>{app.company}</td>
                        <td>{app.position}</td>
                        <td>{app.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
