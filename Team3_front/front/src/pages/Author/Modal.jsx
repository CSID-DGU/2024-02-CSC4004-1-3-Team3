import React, { useState } from 'react';
import Toast from './Toast';
import './Modal.css';

const Modal = ({ show, onClose, children }) => {
  const [showToast, setShowToast] = useState(false);

  const handleFollowClick = () => {
    console.log('Follow button clicked!');
    setShowToast(true);
  };

  if (!show) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <button className="close-btn" onClick={onClose}>
            X
          </button>
          <div className="modal-image">
            <img src="path/image.jpg" alt="Artist" className="artist-image" />
          </div>
          <div className="modal-header">
            <h2 className="author-name">김민설</h2>
            <p>email@google.com</p>
            <p className="modal-description">
              호세 빅토리아노 곤잘레스-페레즈는 후안 그리스로도 알려져 있으며, 그는 스페인의 화가로
              삶 대부분을 프랑스에서 보내며 훌륭한 회화작품과 조각품을 남겼다. 그의 작품들은
              예술계에 새로운 장르를 창출하는데 이바지하였다.
            </p>
          </div>

          {/* Follow 버튼을 설명 아래로 이동 */}
          <div className="follow-section">
            <button className="follow-btn" onClick={handleFollowClick}>
              follow
            </button>
          </div>

          {/* 작품 이미지는 follow-section 아래로 */}
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

          {/* children 렌더링 */}
          <div className="modal-children">{children}</div>
        </div>
      </div>
      {showToast && <Toast message="팔로우하기 시작했습니다" onClose={() => setShowToast(false)} />}
    </>
  );
};

export default Modal;
