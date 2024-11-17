// src/components/BackButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css';

function BackButton() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };
  return (
    <div className="back-button">
      <button onClick={handleBackClick}>&lt;&nbsp;&nbsp;작품 등록하기</button>
    </div>
  );
}

export default BackButton;
