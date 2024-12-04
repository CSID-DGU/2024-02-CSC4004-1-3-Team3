import React, { useCallback, useEffect, useState } from 'react';
import './AuctionModal.css';
import { useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const AuctionModal = ({ show, onClose, item }) => {
  const navigate = useNavigate();
  console.log(item);
  const baseURL = 'https://port-0-opensw-m3e7ph25a50cae42.sel4.cloudtype.app';
  const [auctionItem, setAuctionItem] = useState(null);
  const [mainImageUrl, setMainImageUrl] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const currentUserId = localStorage.getItem('userId');

  useEffect(() => {
    if (!show) return;

    // 상세 정보를 가져오고 WebSocket 연결
    const fetchAuctionDetail = async () => {
      try {
        const response = await fetch(`${baseURL}/auction/${item.id}`);
        const result = await response.json();
        if (result.success) {
          setAuctionItem(result.responseDto);
          setMainImageUrl(result.responseDto.pictureUrls[0]);

          const client = new Client({
            webSocketFactory: () => new SockJS(`${baseURL}/auction/${item.id}`),
            onConnect: () => {
              console.log('STOMP WebSocket 연결 성공');
              client.subscribe(`/topic/auction/${item.id}`, message => {
                const updateData = JSON.parse(message.body);
                setAuctionItem(prev => ({
                  ...prev,
                  ingPrice: updateData.currentPrice,
                  lastBidUser: updateData.lastBidUserId,
                }));
              });
            },
            onStompError: frame => {
              console.error('STOMP 에러:', frame.headers['message']);
            },
          });

          client.activate();
          setStompClient(client);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchAuctionDetail();

    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, [show, item.id]);

  const handleBid = useCallback(() => {
    if (!currentUserId) {
      navigate('/login');
      return;
    }

    if (!stompClient || !bidAmount) {
      alert('입찰 금액을 입력해주세요.');
      return;
    }

    const bidData = {
      userId: parseInt(currentUserId),
      auctionId: item.id,
      bidPrice: bidAmount,
    };

    try {
      stompClient.publish({
        destination: '/app/bid',
        body: JSON.stringify(bidData),
      });

      alert('입찰이 성공적으로 완료되었습니다.');
      setBidAmount('');
    } catch (error) {
      console.error('입찰 처리 중 오류:', error);
      alert('입찰 처리 중 오류가 발생했습니다.');
    }
  }, [stompClient, bidAmount, item.id, currentUserId, navigate]);

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
              <button
                className="bid-submit-button"
                onClick={handleBid}
                disabled={!bidAmount || parseInt(bidAmount) <= parseInt(auctionItem.ingPrice)}
              >
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
