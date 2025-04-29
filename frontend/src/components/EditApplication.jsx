import React, { useState, useEffect } from 'react';
import '../styles/edit-application.css';

const EditApplication = ({ application, onSubmit, onCancel }) => {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('Applied');

  useEffect(() => {
    if (application) {
      setCompany(application.company);
      setPosition(application.position);
      setStatus(application.status);
    }
  }, [application]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedApplication = {
      company,
      position,
      status,
      notes,
      created_by,
    };
    onSubmit(updatedApplication);
  };

  return (
    <div className="app-form-container">
      <h3>Edit Application</h3>
      <form className="application-form" onSubmit={handleSubmit}>
        <label>
          Company Name:
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </label>
        <label>
          Position:
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </label>
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>Applied</option>
            <option>Interview</option>
            <option>Offered</option>
            <option>Rejected</option>
          </select>
        </label>
        <div className="form-actions">
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditApplication;
