import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './auctionadd.css';

function AuctionAdd() {
  const navigate = useNavigate();
  const [artworks, setArtworks] = useState([]); // 작품 데이터 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [selectedImages, setSelectedImages] = useState(new Set()); // 선택된 이미지
  const [showModal, setShowModal] = useState(false); // 모달 표시 상태
  const [startingPrice, setStartingPrice] = useState(''); // 시작가 상태
  const userId = localStorage.getItem('userId'); // localStorage에서 사용자 ID 가져오기

  useEffect(() => {
    // 로그인 여부 확인
    if (!userId) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    // 작품 데이터 불러오기
    fetch(
      `https://port-0-opensw-m3e7ph25a50cae42.sel4.cloudtype.app/mypage/regist/auction/${userId}`
    )
      .then(response => response.json())
      .then(data => {
        console.log('API 응답 데이터:', data); // 디버깅용 로그
        if (data.success && data.responseDto) {
          setArtworks(data.responseDto); // 응답 데이터의 `responseDto` 배열 저장
        } else {
          console.error('API 응답 데이터에 문제가 있습니다:', data);
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error('작품 데이터 가져오기 에러:', error);
        setIsLoading(false);
      });
  }, [userId, navigate]);

  // 이미지 클릭 핸들러
  const handleImageClick = id => {
    setSelectedImages(prevSelected => {
      const updatedSet = new Set(prevSelected);
      if (updatedSet.has(id)) {
        updatedSet.delete(id);
      } else {
        updatedSet.add(id);
      }
      return updatedSet;
    });
  };

  // 경매 등록 버튼 핸들러
  const handleAddArtwork = () => {
    if (selectedImages.size === 0) {
      alert('등록할 작품을 선택해주세요.');
      return;
    }
    setShowModal(true); // 모달 열기
  };

  // 모달 제출 핸들러
  const handleModalSubmit = async () => {
    const requestData = {
      userId: parseInt(userId, 10),
      pictureId: Array.from(selectedImages)[0], // 첫 번째 선택된 이미지 ID
      startPrice: startingPrice.toString(),
    };
    console.log('서버로 전송할 데이터:', requestData);

    try {
      const response = await fetch(
        'https://port-0-opensw-m3e7ph25a50cae42.sel4.cloudtype.app/mypage/regist/auction',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response.ok) {
        alert('경매가 성공적으로 등록되었습니다.');
      } else {
        const errorData = await response.json();
        console.error('서버 응답 에러 데이터:', errorData);
        alert('경매 등록에 실패했습니다.');
      }
    } catch (error) {
      console.error('서버 통신 에러:', error);
      alert('서버와 통신 중 오류가 발생했습니다.');
    }
  };

  // 모달 닫기 핸들러
  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="my-page-container">
      <header className="header">
        <span onClick={() => navigate('/mypage')} style={{ cursor: 'pointer' }}>
          ＜ 경매 등록하기
        </span>
      </header>
      <div className="image-grid">
        {isLoading ? (
          <p>로딩 중...</p>
        ) : artworks.length > 0 ? (
          artworks.map(artwork => (
            <div
              key={artwork.id}
              className={`image-placeholder ${selectedImages.has(artwork.id) ? 'selected' : ''}`}
              onClick={() => handleImageClick(artwork.id)}
            >
              <img
                src={artwork.url} // URL에서 이미지 가져오기
                alt={artwork.pictureName} // 작품 이름 표시
                onError={() => console.error(`이미지 로드 실패: ${artwork.url}`)} // 로드 실패 시 로그 출력
              />
              <p>{artwork.pictureName}</p> {/* 작품 이름 표시 */}
            </div>
          ))
        ) : (
          <p className="no-artworks">등록된 작품이 없습니다.</p>
        )}
      </div>
      <button className="add-artwork-button" onClick={handleAddArtwork}>
        경매 등록
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>시작가 설정</h3>
            <input
              type="number"
              value={startingPrice}
              onChange={e => setStartingPrice(e.target.value)}
              placeholder="시작가 입력"
            />
            <button onClick={handleModalSubmit}>확인</button>
            <button onClick={handleModalClose}>취소</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AuctionAdd;
