import React, { useState } from 'react';
import Toast from './Toast';
import './Modal.css';

const Modal = ({ show, onClose, selectedItem }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [followers, setFollowers] = useState(selectedItem?.followers || 0); // 초기 팔로워 수

  const handleFollowClick = async () => {
    if (!selectedItem) return;

    try {
      // API 요청
      const response = await fetch(
        'https://port-0-opensw-m3e7ph25a50cae42.sel4.cloudtype.app/follow',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            follow: true, // 명세서에 따른 body 값
            userId: selectedItem.id, // 선택된 작가 ID 전달
          }),
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        // 성공 시 팔로워 수 업데이트
        setFollowers(prev => prev + 1);
        setToastMessage('팔로우 요청이 성공했습니다!');
      } else {
        // 실패 시 서버에서 반환한 메시지 출력
        setToastMessage(result.message || '팔로우 요청에 실패했습니다.');
      }
    } catch (error) {
      // 네트워크 오류 처리
      setToastMessage('네트워크 오류가 발생했습니다.');
    } finally {
      setShowToast(true); // 토스트 메시지 표시
    }
  };

  if (!show || !selectedItem) return null;

  return (
    <>
      <div className="Author-modal-overlay" onClick={onClose}>
        <div className="Author-modal-content" onClick={e => e.stopPropagation()}>
          {/* 닫기 버튼 */}
          <button className="Author-close-btn" onClick={onClose}>
            X
          </button>

          {/* 상단 이미지 */}
          <div className="Author-modal-image">
            <img
              src={selectedItem.image}
              alt={selectedItem.title}
              className="Author-artist-image"
            />
          </div>

          {/* 모달 헤더 */}
          <div className="Author-modal-header">
            <h2 className="Author-author-name">{selectedItem.title}</h2>
            <p className="Author-modal-description">
              {selectedItem.description ||
                '호세 빅토리아노 곤잘레스-페레즈는 후안 그리스로도 알려져 있으며, 그는 스페인의 화가로 삶 대부분을 프랑스에서 보내며 훌륭한 회화작품과 조각품을 남겼다. 그의 작품들은 예술계에 새로운 장르를 창출하는데 이바지하였다.'}
            </p>
          </div>

          {/* Follow 버튼 */}
          <div className="Author-follow-section">
            <button className="Author-follow-btn" onClick={handleFollowClick}>
              follow : {followers}
            </button>
          </div>

          {/* 이미지 그리드 */}
          <div className="Author-image-grid">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="Author-image-placeholder">
                picture name
              </div>
            ))}
          </div>

          <a href="#" className="Author-more-link">
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
