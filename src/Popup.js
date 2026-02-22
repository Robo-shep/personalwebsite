import React, { useState } from 'react';
import './Popup.css';

const Popup = ({ title, onClose, children }) => {
  const [isClosing, setIsClosing] = useState(false);

  // Triggers the animation, waits 300ms, then actually closes
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === 'popup-overlay') {
      handleClose();
    }
  };

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className={`popup-window ${isClosing ? 'closing' : ''}`}>
        <div className="popup-header">
          <h3>{title}</h3>
          <button className="close-btn" onClick={handleClose}>
            &times;
          </button>
        </div>
        <div className="popup-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Popup;