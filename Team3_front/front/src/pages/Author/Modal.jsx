import React, { useState } from 'react';
import Toast from './Toast';
import './Modal.css';

const Modal = ({ show, onClose, selectedItem, updateFollowers }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [followers, setFollowers] = useState(selectedItem?.followers || 0);

  const userId = localStorage.getItem('userId');

  const handleFollowClick = async () => {
    if (!selectedItem) return;

    try {
      //const userId = 1; // 테스트용 사용자 ID
      const authorId = selectedItem.id;

      // GET 요청 URL에 파라미터 추가
      const url = `https://port-0-opensw-m3e7ph25a50cae42.sel4.cloudtype.app/author`;
      console.log('팔로우 요청 URL:', url);
      console.log(userId, authorId);

      // API 요청
      const response = await fetch(url, {
        method: 'POST', // GET 요청
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          authorId: authorId,
        }),
      });

      const result = await response.json();
      console.log('API 응답 데이터:', result);

      if (response.ok && result.success) {
        const newFollowersCount = followers + 1;
        setFollowers(newFollowersCount); // 모달 내부 팔로워 수 업데이트
        updateFollowers(selectedItem.id, newFollowersCount); // Author 컴포넌트에 업데이트
        setToastMessage('팔로우 요청이 성공했습니다!');
      } else {
        console.error('API 요청 실패:', result);
        setToastMessage(result.error?.msg || '팔로우 요청에 실패했습니다.');
      }
    } catch (error) {
      console.error('네트워크 오류:', error);
      setToastMessage('네트워크 오류가 발생했습니다.');
    } finally {
      setShowToast(true); // 토스트 알림 표시
    }
  };

  if (!show || !selectedItem) return null;

  return (
    <>
      <div className="Author-modal-overlay" onClick={onClose}>
        <div className="Author-modal-content" onClick={e => e.stopPropagation()}>
          <button className="Author-close-btn" onClick={onClose}>
            X
          </button>

          <div className="Author-modal-image">
            <img src={selectedItem.recentPictures?.[0].imageUrl} className="Author-artist-image" />
          </div>

          <div className="Author-modal-header">
            <h2 className="Author-author-name">{selectedItem.userName}</h2>
            <p className="Author-modal-description">
              {selectedItem.userEmail || '작가 설명이 없습니다.'}
            </p>
          </div>

          <div className="Author-follow-section">
            <button className="Author-follow-btn" onClick={handleFollowClick}>
              follow : {selectedItem.followersCount}
            </button>
          </div>

          <div className="Author-image-grid">
            {selectedItem.recentPictures?.map((picture, index) => (
              <div
                key={index}
                className="Author-image-placeholder"
                style={{
                  backgroundImage: `url(${picture.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {picture.name}
              </div>
            ))}
          </div>

          <a href="#" className="Author-more-link">
            more picture
          </a>
        </div>
      </div>

      {showToast && <Toast message={toastMessage} onClose={() => setShowToast(false)} />}
    </>
  );
};

export default Modal;
