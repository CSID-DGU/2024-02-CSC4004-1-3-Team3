// src/components/Share.jsx
import React, { useState } from 'react';
import './Share.css';
import share from '../../../img/share.png';
import CustomAlert from './CustomAlert';

function Share() {
  const [alertVisible, setAlertVisible] = useState(false);

  const handleShareClick = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setAlertVisible(true); // 알림 표시
      })
      .catch(err => {
        console.error('URL 복사 실패:', err);
      });
  };

  const handleCloseAlert = () => {
    setAlertVisible(false); // 알림 닫기
  };

  return (
    <>
      <button
        className="share"
        onClick={handleShareClick}
        style={{
          cursor: 'pointer',
          background: 'none',
          border: 'none',
          display: 'inline-flex',
        }}
      >
        <img src={share} alt="공유하기" style={{ width: '25px', height: '22px' }} />
      </button>
      {alertVisible && (
        <CustomAlert message="URL이 클립보드에 복사되었습니다" onClose={handleCloseAlert} />
      )}
    </>
  );
}

export default Share;
