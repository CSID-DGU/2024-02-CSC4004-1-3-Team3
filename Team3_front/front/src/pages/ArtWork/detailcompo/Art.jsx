// src/components/ArtDetails.js
import React, { useState, useEffect } from 'react';
import './Art.css';
import emptyHeart from '../../../img/heart-shape.png';
import ImageModal from './ImageModal';
//import worksData from '../../../components/works.jsx';

function Art({ artwork }) {
  const [images, setImages] = useState([]); // 이미지 배열 상태 초기화
  const [isModalOpen, setIsModalOpen] = useState(false); // 이미지 모달 창의 상태 (열림/닫힘)

  useEffect(() => {
    if (artwork && artwork.images) {
      setImages(artwork.images);
    }
  }, [artwork]);

  // 썸네일을 클릭하면 해당 이미지를 메인 이미지와 교체
  const handleThumbnailClick = index => {
    setImages(prevImages => {
      const newImages = [...prevImages];
      [newImages[0], newImages[index]] = [newImages[index], newImages[0]]; // 이미지 교환
      return newImages;
    });
  };

  // 모달 창 열고 닫는 함수
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 작품 데이터를 찾지 못했을 경우 표시할 메시지
  if (!artwork) return <p>작품 정보를 찾을 수 없습니다.</p>;

  return (
    <div className="art-container" style={{ margin: '10px' }}>
      <div className="art-details">
        <div className="art-image">
          <div className="likedcss">
            <img
              src={emptyHeart}
              alt="heart icon"
              style={{ width: '12px', height: '12px', cursor: 'pointer' }}
            />
            <p>{artwork.totalLiked || 0}</p> {/* 작품의 총 좋아요 수 (기본값 0) */}
          </div>
          <div className="imgchange">
            {/* 첫 번째 이미지를 메인 이미지로 사용 */}
            {images.length > 0 ? (
              <img
                src={images[0]}
                alt="작품 이미지"
                style={{ cursor: 'pointer' }}
                onClick={openModal}
              />
            ) : (
              <p>이미지가 없습니다.</p>
            )}
            <div className="thumbnail-gallery">
              {/* 썸네일 이미지를 동적으로 렌더링 */}
              {images.slice(1).map((thumbnail, index) => (
                <img
                  key={index}
                  src={thumbnail}
                  alt={`썸네일 ${index + 1}`}
                  onClick={() => handleThumbnailClick(index + 1)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="art-info">
          <h1>{artwork.author.name}</h1>
          <p>{artwork.name}</p>
          <p>{artwork.ingredient}</p>
          <p>
            {artwork.size} | {artwork.year}
          </p>
        </div>
      </div>
      {/* 모달 창이 열렸을 경우 메인 이미지를 모달에 표시 */}
      {isModalOpen && <ImageModal image={images[0]} onClose={closeModal} />}
    </div>
  );
}

export default Art;
