import React, { useState } from 'react';
import Modal from './Modal';
import './Author.css';

const Author = () => {
  const [showModal, setShowModal] = useState(false); // 모달 상태
  const [selectedItem, setSelectedItem] = useState(null); // 선택된 항목 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
  const totalPages = 5; // 총 페이지 수

  const openModal = index => {
    setSelectedItem(index); // 선택된 박스의 데이터 설정
    setShowModal(true); // 모달 열기
  };

  const closeModal = () => {
    setShowModal(false); // 모달 닫기
    setSelectedItem(null); // 선택 초기화
  };

  const goToPreviousPage = () => {
    setCurrentPage(prev => (prev > 1 ? prev - 1 : prev)); // 이전 페이지
  };

  const goToNextPage = () => {
    setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev)); // 다음 페이지
  };

  const items = [
    {
      title: '김민설',
      details: '소나무\n종이에 마커\n65x90cm | 2019',
      image: 'path/to/your/image.jpg',
    },
    // 7개 추가 항목 (샘플 데이터)
    ...Array(7).fill({
      title: '김민설',
      details: '소나무\n종이에 마커\n65x90cm | 2019',
      image: 'path/to/your/image.jpg',
    }),
  ];

  return (
    <div className="container">
      <div className="sort-filter">
        <span className="sort-item active">최신순</span>
        <span> | </span>
        <span className="sort-item">인기순</span>
      </div>
      <div className="art-grid">
        {items.map((item, index) => (
          <div key={index} className="art-card" onClick={() => openModal(index)}>
            <div className="art-image">
              <img
                src={item.image}
                alt={item.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className="art-text">
              <h3 className="art-title">{item.title}</h3>
              <p className="art-details">{item.details}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button className="page-button" onClick={goToPreviousPage}>
          {'<'}
        </button>
        <span className="page-button">{currentPage}</span>
        <button className="page-button" onClick={goToNextPage}>
          {'>'}
        </button>
      </div>

      {/* 모달 렌더링 */}
      {showModal && (
        <Modal show={showModal} onClose={closeModal}>
          <div className="Author-modal-header">
            <h2 className="Author-author-name">{items[selectedItem]?.title}</h2>
            <p className="Author-modal-description">{items[selectedItem]?.details}</p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Author;
