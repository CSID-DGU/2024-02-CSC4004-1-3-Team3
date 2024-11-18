import React from 'react';
import './AuctionItem.css';

const AuctionItem = ({ image, title, artist, minBid, currentBid }) => {
  return (
    <div className="auction-card">
      <div className="auction-image" style={{ backgroundImage: `url(${image})` }}></div>
      <div className="auction-details">
        <h2 className="art-title">{title}</h2>
        <p className="artist-name">{artist}</p>
      </div>
      <div className="auction-bid">
        <div className="bid-info">
          <div className="bid-row">
            <span className="label">최소입찰가</span>
            <span className="value">{minBid}원</span>
          </div>
          <div className="bid-row">
            <span className="label">현재 금액</span>
            <span className="value">{currentBid}원</span>
          </div>
        </div>
        <button className="bid-button">입찰하기</button>
      </div>
    </div>
  );
};

export default AuctionItem;
