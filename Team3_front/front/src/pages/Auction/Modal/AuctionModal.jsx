import React, { useCallback, useEffect, useState } from 'react';
import './AuctionModal.css';
import { useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

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

    const connect = async () => {
      try {
        // 먼저 경매 정보 가져오기
        const response = await fetch(`${baseURL}/auction/${item.id}`);
        const result = await response.json();

        if (result.success) {
          setAuctionItem(result.responseDto);
          setMainImageUrl(result.responseDto.pictureUrls[0]);

          // WebSocket 연결 설정
          const socket = new SockJS(`${baseURL}/ws`);
          const client = Stomp.over(socket);

          client.connect(
            {},
            () => {
              console.log('WebSocket Connected Successfully');

              // 경매 입찰 업데이트 구독
              client.subscribe(`/topic/auction/${item.id}`, message => {
                try {
                  const data = JSON.parse(message.body);
                  console.log('Received auction update:', data);

                  setAuctionItem(prevState => {
                    if (!prevState) return prevState;

                    return {
                      ...prevState,
                      ingPrice: data.currentPrice,
                      lastBidUser: data.lastBidUserId,
                    };
                  });
                } catch (error) {
                  console.error('Error processing message:', error);
                }
              });
            },
            error => {
              console.error('WebSocket Connection Error:', error);
            }
          );

          setStompClient(client);
        }
      } catch (error) {
        console.error('Fetch Error:', error);
      }
    };

    connect();

    return () => {
      if (stompClient) {
        try {
          stompClient.disconnect(() => {
            console.log('WebSocket Disconnected');
            setStompClient(null);
          });
        } catch (error) {
          console.error('Disconnect Error:', error);
        }
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

    try {
      const bidData = {
        userId: parseInt(currentUserId),
        auctionId: item.id,
        bidPrice: bidAmount,
      };

      stompClient.send('/app/bid', {}, JSON.stringify(bidData));
      console.log('Bid sent successfully');
      setBidAmount('');
    } catch (error) {
      console.error('Error sending bid:', error);
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

            <div className="current-bid">
              <h3>마지막 입찰자</h3>
              {auctionItem.lastBidUser}
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
