import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import './auctionadd.css';

function AuctionAdd() {
  const navigate = useNavigate(); // navigate 초기화
  const [artworks, setArtworks] = useState([]); // State for artworks
  const [isLoading, setIsLoading] = useState(true); // State for loading
  const [selectedImages, setSelectedImages] = useState(new Set()); // Track clicked images

  useEffect(() => {
    // Fetch artworks from the backend
    fetch('/api/my-artworks') // Replace with your actual backend API endpoint
      .then((response) => response.json())
      .then((data) => {
        setArtworks(data); // Save fetched artworks
        setIsLoading(false); // Loading complete
      })
      .catch((error) => {
        console.error('Error fetching artworks:', error);
        setIsLoading(false); // Stop loading on error
      });
  }, []);

  const handleImageClick = (id) => {
    setSelectedImages((prevSelected) => {
      const updatedSet = new Set(prevSelected);
      if (updatedSet.has(id)) {
        updatedSet.delete(id); // Remove if already selected
      } else {
        updatedSet.add(id); // Add if not selected
      }
      return updatedSet;
    });
  };

  const handleAddArtwork = () => {
    console.log('작품 등록 버튼 클릭됨');
  };

  return (
    <div className="my-page-container">
      <header className="header">
        {/* 경매 등록하기 글자를 클릭하면 mypage로 이동 */}
        <span onClick={() => navigate('/mypage')} style={{ cursor: 'pointer' }}>
          ＜ 경매 등록하기
        </span>
      </header>
      <div className="image-grid">
        {isLoading ? (
          <p>로딩 중...</p> // Show loading message
        ) : artworks.length > 0 ? (
          artworks.map((artwork) => (
            <div
              key={artwork.id}
              className={`image-placeholder ${
                selectedImages.has(artwork.id) ? 'selected' : ''
              }`}
              onClick={() => handleImageClick(artwork.id)}
            >
              <img src={artwork.image} alt={artwork.name} />
              <p>{artwork.name}</p>
            </div>
          ))
        ) : (
          <p className="no-artworks">나의작품이 없습니다</p>
        )}
      </div>
      <button className="add-artwork-button" onClick={handleAddArtwork}>
        경매 등록
      </button>
    </div>
  );
}

export default AuctionAdd;
