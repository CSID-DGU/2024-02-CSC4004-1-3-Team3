import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Mypage_artist.css';

function MyPage_artist() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({ id: '', email: '' });
  const [interests, setInterests] = useState([]);
  const [auctions, setAuctions] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetch('/api/user')
      .then(response => response.json())
      .then(data => setUserData({ id: data.id, email: data.email }))
      .catch(error => console.error('Error fetching user data:', error));

    fetch('/api/favorite-artworks')
      .then(response => response.json())
      .then(data => setInterests(data))
      .catch(error => console.error('Error fetching favorite artworks:', error));

    fetch('/api/user-auctions')
      .then(response => response.json())
      .then(data => setAuctions(data))
      .catch(error => console.error('Error fetching user auctions:', error));
  }, []);

  const handleImageChange = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleDelete = artworkId => {
    setInterests(interests.filter(artwork => artwork.id !== artworkId));
  };
  const handleAddArtwork = () => {
    navigate('/mypage/workadd'); // "작품 추가" 페이지로 이동
  };
  return (
    <div className="my-page">
      <header className="header">MY PAGE</header>

      <div className="profile-section">
        <div className="profile-image-container">
          <div className="profile-image">
            {profileImage ? <img src={profileImage} alt="Profile" /> : null}
          </div>
          <label htmlFor="imageUpload" className="edit-icon">
            <i className="fa-solid fa-pen-to-square" />
          </label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>
        <div className="profile-info">
          <p>아이디: {userData.id}</p>
          <p>이메일: {userData.email}</p>
        </div>
      </div>

      <div className="interests-section">
        <div className="interests-header">
          <h3 className="interest-name">나의작품</h3>
          <div>
            <button className="edit-text" onClick={toggleEditMode}>
              {isEditMode ? '돌아가기' : '편집'}
            </button>
          </div>
        </div>
        <div className="interests-images">
          {interests.length > 0 ? (
            interests.map(artwork => (
              <div key={artwork.id} className="interest-image">
                {isEditMode && (
                  <button className="delete-icon" onClick={() => handleDelete(artwork.id)}>
                    ×
                  </button>
                )}
                <img src={artwork.image} alt={artwork.name} />
                <p>{artwork.name}</p>
              </div>
            ))
          ) : (
            <p className="no-artworks">나의작품이 없습니다.</p>
          )}
        </div>
        {isEditMode && (
          <div>
            <button className="add-artwork" onClick={handleAddArtwork}>
              작품추가
            </button>
          </div>
        )}
      </div>

      <div className="auction-section">
        <h3 className="auction-name">진행중인 경매</h3>
        <div className="auction-item-list">
          {auctions.length > 0 ? (
            auctions.map(auction => (
              <div key={auction.id} className="auction-item">
                <p>
                  {auction.artworkName} - {auction.artistName}
                </p>
                <span>시작가: {auction.startPrice} KRW</span>
              </div>
            ))
          ) : (
            <p className="no-auctions">진행중인 경매가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyPage_artist;
