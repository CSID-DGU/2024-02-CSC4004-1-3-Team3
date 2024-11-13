// src/components/CustomAlert.jsx
import React from 'react';
import './CustomAlert.css';

function CustomAlert({ message, onClose }) {
  return (
    <div className="custom-alert-overlay">
      <div className="custom-alert">
        <p>{message}</p>
        <button onClick={onClose}>확인</button>
      </div>
    </div>
  );
}

export default CustomAlert;
