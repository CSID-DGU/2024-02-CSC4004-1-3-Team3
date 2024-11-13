import React, { useState, useEffect } from 'react';
import ImageModal from './ImageModal';
import worksData from './../component/works';
import './ArtistDescription.css';

function ArtistDescription({ id }) {
  const [item, setItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const foundItem = worksData[parseInt(id)];
    setItem(foundItem || null);
  }, [id]);
  if (!item) return <p>작품 정보를 찾을 수 없습니다.</p>;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="art-description">
      <img
        src={item.artistimg}
        alt="작가 사진"
        style={{
          width: '300px',
          height: 'auto',
          cursor: 'pointer',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        }}
        onClick={openModal}
      />
      <h2>작가 설명</h2>
      <p>{item.artistdes}</p>
      {isModalOpen && <ImageModal image={item.artistimg} onClose={closeModal} />}
    </div>
  );
}

export default ArtistDescription;
