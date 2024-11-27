import React, { useState } from 'react';
import ImageModal from './ImageModal';
//import worksData from '../../../components/works.jsx';

function ArtistDescription({ artwork }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!artwork) return <p>작품 정보를 찾을 수 없습니다.</p>;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="art-description">
      <img
        src={artwork.authorImage}
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
      <p>{artwork.artistdescription}</p>
      {isModalOpen && <ImageModal image={artwork.author.authorImage} onClose={closeModal} />}
    </div>
  );
}

export default ArtistDescription;
