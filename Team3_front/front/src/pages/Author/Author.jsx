import React, { useState } from 'react';
import Modal from './Modal';
import './Author.css';

const Author = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const goToPreviousPage = () => {
    setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
  };

  return (
    <div className="container">
      <div className="sort-filter">
        <span className="sort-item active">최신순</span>
        <span>|</span>
        <span className="sort-item">인기순</span>
      </div>
      <div className="art-grid">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="art-card" onClick={openModal}>
            <div className="art-image">
              <img
                src="path/to/your/image.jpg"
                alt="Artwork"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className="art-text">
              <h3 className="art-title">김민설</h3>
              <p className="art-details">소나무 종이에 먹과 채색</p>
              <p className="art-details">65x90cm | 2019</p>
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

      <Modal show={showModal} onClose={closeModal}>
        <div className="modal-image">
          <img src="path/image.jpg" alt="Artist" className="artist-image" />
        </div>
        <div className="modal-header">
          <h2 className="author-name">김민설</h2>
          <p>email@google.com</p>
          <p className="modal-description">
            호세 빅토리아노 곤잘레스-페레즈는 후안 그리스로도 알려져 있으며, 그는 스페인의 화가로 삶
            대부분을 프랑스에서 보내며 훌륭한 회화작품과 조각품을 남겼다. 그의 작품들은 예술계에
            새로운 장르를 창출하는데 이바지하였다.
          </p>
          <button className="follow-btn">follow</button>
        </div>
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
      </Modal>
    </div>
  );
};

export default Author;
