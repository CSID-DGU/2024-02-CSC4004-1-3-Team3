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
  const [storedUserId, setStoredUserId] = useState(''); // 가져온 userId를 저장할 상태

  // 유저 데이터 가져오기
  const fetchUserData = async () => {
    const userId = localStorage.getItem('userId');
    console.log('LocalStorage userId:', userId); // 콘솔에 출력해 확인

    if (!userId) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    setStoredUserId(userId); // 가져온 userId를 상태에 저장

    // URL 쿼리 파라미터 형식으로 수정
    const apiUrl = `https://port-0-opensw-m3e7ph25a50cae42.sel4.cloudtype.app/mypage?userId=${userId}`;
    console.log('API URL:', apiUrl); // 요청 URL 확인을 위한 로그

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('서버 응답 에러:', errorText);
        throw new Error(`HTTP 오류: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('API 응답 데이터:', data);

      if (data.success && data.responseDto) {
        const { userName, loginId, userEmail, userImage, pictureList, auctionList } =
          data.responseDto;

        setUserData({ id: loginId, email: userEmail, name: userName });
        setProfileImage(userImage || '/default-profile.png');
        setInterests(
          pictureList.map(picture => ({
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

  // 프로필 이미지 변경 핸들러
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

  // 편집 모드 토글
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  // 작품 삭제 핸들러
  const handleDelete = artworkId => {
    setInterests(interests.filter(artwork => artwork.id !== artworkId));
  };

  // 작품 추가 페이지 이동
  const handleAddArtwork = () => {
    navigate('/mypage/workadd');
  };

  return (
    <div className="my-page">
      <header className="artist_header">MY PAGE</header>
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
          <p>이름: {userData.name}</p>
        </div>
      </div>

      <div className="interests-section">
        <div className="interests-header">
          <h3 className="interest-name">나의작품</h3>
          <div>
            <button className="edit-text" onClick={() => navigate('/mypage/auctionadd')}>
              경매등록
            </button>
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
