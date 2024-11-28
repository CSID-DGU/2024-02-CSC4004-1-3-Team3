import React, { useState } from 'react';
import Toast from './Toast';
import './Modal.css';

const Modal = ({ show, onClose }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(''); // 토스트 메시지 동적 설정

  const handleFollowClick = async () => {
    try {
      const response = await fetch(
        'https://port-0-opensw-m3e7ph25a50cae42.sel4.cloudtype.app/follow',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            follow: true, // follow 상태 설정
          }),
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        setToastMessage('팔로우 요청이 성공했습니다!'); // 성공 메시지
      } else {
        const errorMessage =
          typeof result.error === 'string'
            ? result.error
            : result.error?.message || '팔로우 요청에 실패했습니다.'; // 객체 메시지 처리
        setToastMessage(errorMessage); // 실패 메시지
      }
      setShowToast(true); // 토스트 알림 표시
    } catch (error) {
      console.error('Error:', error);
      setToastMessage('네트워크 오류가 발생했습니다.'); // 네트워크 오류 처리
      setShowToast(true);
    }
  };

  if (!show) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content unique-class" onClick={e => e.stopPropagation()}>
          {/* 닫기 버튼 */}
          <button className="close-btn" onClick={onClose}>
            X
          </button>

          {/* 상단 이미지 */}
          <div className="modal-image">
            <img src="path/to/image.jpg" alt="Artist" className="artist-image" />
          </div>

          {/* 모달 헤더 */}
          <div className="modal-header">
            <h2 className="author-name">김민설</h2>
            <p>email@google.com</p>
            <p className="modal-description">
              호세 빅토리아노 곤잘레스-페레즈는 후안 그리스로도 알려져 있으며, 그는 스페인의 화가로
              삶 대부분을 프랑스에서 보내며 훌륭한 회화작품과 조각품을 남겼다. 그의 작품들은
              예술계에 새로운 장르를 창출하는데 이바지하였다.
            </p>
          </div>

          {/* Follow 버튼 */}
          <div className="follow-section">
            <button className="follow-btn" onClick={handleFollowClick}>
              follow
            </button>
          </div>

          {/* 이미지 그리드 */}
          <div className="image-grid">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="image-placeholder">
                picture name
              </div>
            ))}
          </div>

          <a href="#" className="more-link">
            more picture
          </a>
        </div>
      </div>

      {/* 토스트 메시지 */}
      {showToast && <Toast message={toastMessage} onClose={() => setShowToast(false)} />}
    </>
  );
};

export default Modal;
