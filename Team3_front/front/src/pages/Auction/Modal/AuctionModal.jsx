import React, { useEffect, useState } from 'react';
import './AuctionModal.css';

const AuctionModal = ({ show, onClose, item }) => {
  console.log(item);
  const baseURL = 'https://port-0-opensw-m3e7ph25a50cae42.sel4.cloudtype.app';
  const [auctionItem, setAuctionItem] = useState(null);
  const [mainImageUrl, setMainImageUrl] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(item);
        const response = await fetch(`${baseURL}/auction/${item.id}`);
        const result = await response.json();
        if (result.success) {
          console.log(result.responseDto);
          setAuctionItem(result.responseDto);
          setMainImageUrl(result.responseDto.pictureUrls[0]);
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 에러 발생:', error);
      }
    };

    fetchData();
  }, []);

  if (!show) return null;
  if (!auctionItem) return null;

  // 모달 바깥 영역 클릭 핸들러
  const handleOverlayClick = e => {
    if (e.target.className === 'modal-overlay-auction') {
      onClose(); // 모달 닫기
    }
  };

  const handleThumbImageClick = url => {
    setMainImageUrl(url);
  };

  return (
    <div className="modal-overlay-auction" onClick={handleOverlayClick}>
      <div className="modal-content-auction">
        <div className="modal-left">
          <div className="modal-main-image" style={{ backgroundImage: `url(${mainImageUrl})` }}>
            {mainImageUrl}
          </div>
          <div className="thumbnail-list">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="thumbnail"
                style={{ backgroundImage: `url(${auctionItem.pictureUrls[index]})` }}
                onClick={() => handleThumbImageClick(auctionItem.pictureUrls[index])}
              >
                {auctionItem.pictureUrls[index]}
              </div>
            ))}
          </div>
        </div>

        <div className="modal-right">
          <div className="art-description-auction">
            <h2>작품설명</h2>
            {auctionItem.picture.description}
          </div>

          <div className="bid-content">
            <div className="current-bid">
              <h3>현재 금액</h3>
              {auctionItem.ingPrice}원
            </div>

            <div className="bid-actions">
              <input type="number" placeholder="입찰 금액 입력" className="bid-input" />
              <button className="bid-submit-button">입찰하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionModal;
