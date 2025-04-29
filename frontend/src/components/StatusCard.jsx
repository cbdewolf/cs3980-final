import React from 'react';
import '../styles/status-card.css';

const StatusCard = ({ label, count }) => {
  return (
    <div className="status-card">
      <p className="status-count">{count}</p>
      <p className="status-label">{label}</p>
    </div>
  );
};

export default StatusCard;
