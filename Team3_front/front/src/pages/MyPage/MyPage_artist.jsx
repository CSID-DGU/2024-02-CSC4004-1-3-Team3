import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Mypage_artist.css';

function MyPage_artist() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ id: '', email: '', name: '' });
  const [profileImage, setProfileImage] = useState(null);
  const [interests, setInterests] = useState([]);
  const [auctions, setAuctions] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  // Fetch user data
  const fetchUserData = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    const apiUrl = `https://port-0-opensw-m3e7ph25a50cae42.sel4.cloudtype.app/mypage?userId=${userId}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error(`HTTP 오류: ${response.status}`);

      const data = await response.json();
      if (data.success && data.responseDto) {
        const { userName, loginId, userEmail, userImage, pictureList, auctionList } =
          data.responseDto;

        setUserData({ id: loginId, email: userEmail, name: userName });

        // 프로필 이미지 로컬 저장
        const storedProfileImage = localStorage.getItem('profileImage');
        setProfileImage(storedProfileImage || userImage || '/default-profile.png');

        // 작품 목록 로컬 저장
        const storedInterests = localStorage.getItem('interests');
        setInterests(
          storedInterests
            ? JSON.parse(storedInterests)
            : pictureList.map(picture => ({
                id: picture.id,
                name: picture.name,
                image: picture.imageUrl,
              }))
        );

        setAuctions(
          auctionList.map(auction => ({
            id: auction.id,
            artworkName: auction.pictureName,
            artistName: userName,
            startPrice: auction.startPrice,
          }))
        );
      } else {
        throw new Error(data.error || '데이터를 불러올 수 없습니다.');
      }
    } catch (error) {
      console.error('유저 데이터 가져오기 실패:', error);
      alert(`유저 데이터 가져오기 실패: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setIsDeleteMode(false);
  };

  const toggleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
  };

  const handleDelete = artworkId => {
    const updatedInterests = interests.filter(artwork => artwork.id !== artworkId);
    setInterests(updatedInterests);
    localStorage.setItem('interests', JSON.stringify(updatedInterests)); // 로컬 저장
  };

  const handleAddArtwork = () => {
    navigate('/mypage/workadd');
  };

  const handleImageChange = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newProfileImage = reader.result;
        setProfileImage(newProfileImage);
        localStorage.setItem('profileImage', newProfileImage); // 로컬 저장
      };
      reader.onerror = () => {
        alert('이미지 업로드에 실패했습니다.');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="my-page">
      <div className="profile-section">
        <div className="profile-image-container">
          <div className="profile-image">
            {profileImage ? (
              <img src={profileImage} alt="Profile" />
            ) : (
              <i className="fa-solid fa-user" />
            )}
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
          <p>이름: {userData.name}</p>
        </div>
      </div>

      <div className="interests-section">
        <div className="interests-header">
          <h3 className="interest-name">나의작품</h3>
          <div>
            {!isEditMode && (
              <button className="edit-text" onClick={() => navigate('/mypage/auctionadd')}>
                경매등록
              </button>
            )}
            <button className="edit-text" onClick={toggleEditMode}>
              {isEditMode ? '돌아가기' : '편집'}
            </button>
          </div>
        </div>
        <div className="interests-images">
          {interests.length > 0 ? (
            interests.map(artwork => (
              <div key={artwork.id} className="interest-image">
                {isDeleteMode && (
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
          <div className="button-container">
            <button className="add-artwork" onClick={handleAddArtwork}>
              작품추가
            </button>
            <button className="delete-artwork" onClick={toggleDeleteMode}>
              작품삭제
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
                <span>시작가: {auction.startPrice} 원</span>
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
