import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Detail.css';

function Detail() {
  const [showModal, setShowModal] = useState(false); // 모달 상태 관리
  const navigate = useNavigate();

  const handleRegister = () => {
    setShowModal(true); // 모달 열기
  };

  const handleCloseModal = () => {
    setShowModal(false); // 모달 닫기
    navigate('/mypage'); // /mypage로 이동
  };
  return (
    <div className="detail-container">
      <div className="input-group">
        <label className="label-text">사용 재료</label>
        <textarea type="text" placeholder="사용 재료" />
        <p className="helper-text">예시: 캔버스에 아크릴</p>
      </div>
      <div className="input-group">
        <label className="label-text">작품 크기</label>
        <div className="size-inputs">
          <textarea type="text" placeholder="세로" />
          <p>X</p>
          <textarea type="text" placeholder="가로" />
        </div>
        <p className="helper-text">숫자만 입력</p>
      </div>
      <div className="input-group">
        <label className="label-text">제작 연도</label>
        <textarea type="text" placeholder="제작 연도" />
        <p className="helper-text">숫자만 입력</p>
      </div>
      <div className="input-group">
        <label className="label-text">condition report</label>
        <textarea placeholder="condition report"></textarea>
        <p className="helper-text">예시: 실물 확인 필수</p>
      </div>
      <button className="submit-button" onClick={handleRegister}>
        작품 등록
      </button>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>작품 등록이 완료되었습니다.</p>
            <button className="modal-button" onClick={handleCloseModal}>
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
