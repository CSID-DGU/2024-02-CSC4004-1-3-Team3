import React, { useState, useEffect } from 'react';
import './MyPage_personal.css';

function MyPage_personal() {
  const [userData, setUserData] = useState({ id: '', email: '', image: null });
  const [interests, setInterests] = useState([]);
  const [auctions, setAuctions] = useState([]);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('userId가 없습니다. 로그인 먼저 진행해주세요.');
      return;
    }

    // 쿼리 파라미터 방식으로 URL 수정
    fetch(`https://port-0-opensw-m3e7ph25a50cae42.sel4.cloudtype.app/mypage?userId=${userId}`)
      .then(response => response.json())
      .then(data => {
        if (data.success && data.responseDto) {
          const { userName, userEmail, userImage, pictureList, auctionList } = data.responseDto;
          setUserData({ id: userName, email: userEmail, image: userImage });
          setInterests(pictureList);
          setAuctions(auctionList);
        } else {
          console.error('사용자 데이터 로드 실패:', data.error);
        }
      })
      .catch(error => console.error('사용자 데이터 가져오기 실패:', error));
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

  return (
    <div className="my-page">
      <div className="profile-section">
        <div className="profile-image-container">
          <div className="profile-image">
            {profileImage ? (
              <img src={profileImage} alt="Profile" />
            ) : userData.image ? (
              <img src={userData.image} alt="Profile" />
            ) : null}
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
        <div className="interest-name">
          <h3>관심작품</h3>
        </div>
        <div className="interests-images">
          {interests.length > 0 ? (
            interests.map(artwork => (
              <div key={artwork.id} className="interest-image">
                <img src={artwork.imageUrl} alt={artwork.name} />
                <p>{artwork.name}</p>
              </div>
            ))
          ) : (
            <p className="no-items">관심작품이 없습니다.</p>
          )}
        </div>
      </div>

      <div className="auction-section">
        <div className="auction-name">
          <h3>참여중인 경매</h3>
        </div>
        <div className="auction-item-list">
          {auctions.length > 0 ? (
            auctions.map(auction => (
              <div key={auction.id} className="auction-item">
                <p>
                  {auction.pictureName} - 시작가: {auction.startPrice} KRW
                </p>
                <span>현재가: {auction.ingPrice} KRW</span>
              </div>
            ))
          ) : (
            <p className="no-auctions">참여중인 경매가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyPage_personal;
 