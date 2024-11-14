// src/components/ImageModal.jsx
import React from 'react';
import './ImageModal.css';

function ImageModal({ image, onClose }) {
  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal" onClick={e => e.stopPropagation()}>
        <img src={image} alt="작품 확대 이미지" />
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

export default ImageModal;
