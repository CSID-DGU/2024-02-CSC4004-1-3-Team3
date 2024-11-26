// src/components/ArtDetails.js
import React, { useState } from 'react';
import './Art.css';
import emptyHeart from '../../../img/heart-shape.png';
import ImageModal from './ImageModal';
//import worksData from '../../../components/works.jsx';

function Art({ artwork }) {
  const [images, setImages] = useState([]); // 이미지 배열 상태 초기화
  const [isModalOpen, setIsModalOpen] = useState(false); // 이미지 모달 창의 상태 (열림/닫힘)

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
            <p>{artwork.totalliked}</p> {/* 작품의 총 좋아요 수 */}
          </div>
          <div className="imgchange">
            {/* 첫 번째 이미지를 메인 이미지로 사용 */}
            <img
              src={images[0]}
              alt="작품 이미지"
              style={{ cursor: 'pointer' }}
              onClick={openModal}
            />
            <div className="thumbnail-gallery">
              {/* 각 썸네일 이미지에 onClick 핸들러와 커서 스타일 추가 */}
              <img
                src={images[1]}
                alt="썸네일 1"
                onClick={() => handleThumbnailClick(1)}
                style={{ cursor: 'pointer' }}
              />
              <img
                src={images[2]}
                alt="썸네일 2"
                onClick={() => handleThumbnailClick(2)}
                style={{ cursor: 'pointer' }}
              />
              <img
                src={images[3]}
                alt="썸네일 3"
                onClick={() => handleThumbnailClick(3)}
                style={{ cursor: 'pointer' }}
              />
              <img
                src={images[4]}
                alt="썸네일 4"
                onClick={() => handleThumbnailClick(4)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>
        <div className="art-info">
          <h1>{artwork.authorName}</h1>
          <p>{artwork.name}</p>
          <p>{artwork.ingredient}</p>
          <p>
            {artwork.sizeWidth}X{artwork.sizeHeight}cm | {artwork.createAt}
          </p>
        </div>
      </div>
      {/* 모달 창이 열렸을 경우 메인 이미지를 모달에 표시 */}
      {isModalOpen && <ImageModal image={images[0]} onClose={closeModal} />}
    </div>
  );
}

export default Art;
