import React, { useCallback, useEffect, useState } from 'react';
import './AuctionModal.css';
import { useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';

const AuctionModal = ({ show, onClose, item }) => {
  const navigate = useNavigate();
  console.log(item);
  const baseURL = 'https://port-0-opensw-m3e7ph25a50cae42.sel4.cloudtype.app';
  const [auctionItem, setAuctionItem] = useState(null);
  const [mainImageUrl, setMainImageUrl] = useState([]);
  const [socket, setSocket] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const currentUserId = localStorage.getItem('userId');

  useEffect(() => {
    if (!show) return;

    // 1. 먼저 상세 정보를 가져옴
    const fetchAuctionDetail = async () => {
      try {
        const response = await fetch(`${baseURL}/auction/${item.id}`);
        const result = await response.json();
        if (result.success) {
          setAuctionItem(result.responseDto);
          setMainImageUrl(result.responseDto.pictureUrls[0]);

          // 2. 상세 정보를 받은 후 웹소켓 연결
          const sock = new SockJS(
            `https://port-0-opensw-m3e7ph25a50cae42.sel4.cloudtype.app/auction/${item.id}`
          );

          sock.onopen = () => {
            console.log('SockJS Connected');
          };

          sock.onmessage = event => {
            const data = JSON.parse(event.data);
            setAuctionItem(prev => ({
              ...prev,
              ingPrice: data.currentPrice,
              lastBidUser: data.lastBidUserId,
            }));
          };

          sock.onerror = error => {
            console.error('SockJS Error:', error);
          };

          sock.onclose = event => {
            console.log('SockJS Connection Closed:', event.code, event.reason);
          };

          setSocket(sock);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchAuctionDetail();

    return () => {
      if (socket && socket.readyState === SockJS.OPEN) {
        socket.close();
      }
    };
  }, [show, item.id]);

  const handleBid = useCallback(async () => {
    if (!currentUserId) {
      navigate('/login');
      return;
    }

    if (!socket || !bidAmount) {
      alert('입찰 금액을 입력해주세요.');
      return;
    }

    const bidData = {
      userId: parseInt(currentUserId),
      auctionId: item.id,
      bidPrice: bidAmount,
    };

    try {
      const response = await fetch(`${baseURL}/auction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bidData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || '입찰에 실패했습니다.');
      }

      if (result.success) {
        alert('입찰이 성공적으로 완료되었습니다.');
        setBidAmount('');
      } else {
        alert(result.message || '입찰 처리 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('입찰 처리 중 오류:', error);
      alert(error.message || '입찰 처리 중 오류가 발생했습니다.');
    }
  }, [socket, bidAmount, item.id, currentUserId, navigate]);

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
          <div
            className="modal-main-image"
            style={{ backgroundImage: `url(${mainImageUrl})` }}
          ></div>
          <div className="thumbnail-list">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="thumbnail"
                style={{ backgroundImage: `url(${auctionItem.pictureUrls[index]})` }}
                onClick={() => handleThumbImageClick(auctionItem.pictureUrls[index])}
              ></div>
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
              <input
                type="number"
                placeholder="입찰 금액 입력"
                className="bid-input"
                onChange={e => setBidAmount(e.target.value)}
              />
              <button className="bid-submit-button" onClick={handleBid}>
                입찰하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionModal;
