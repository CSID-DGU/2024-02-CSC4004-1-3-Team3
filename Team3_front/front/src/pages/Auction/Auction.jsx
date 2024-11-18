import React from 'react';
import './Auction.css';
import AuctionItem from './AuctionItem';
import { AuctionList } from './AuctionList';

const Auction = () => {
  return (
    <div className="auction-container">
      <div className="auction-header">
        <span className="sort-option active">최신순</span>|
        <span className="sort-option">인기순</span>
      </div>
      <h1 className="auction-title">AUCTION IN PROGRESS</h1>

      {AuctionList.map((item, index) => (
        <AuctionItem
          key={index}
          image={item.image}
          title={item.title}
          artist={item.artist}
          minBid={item.minBid}
          currentBid={item.currentBid}
        />
      ))}
    </div>
  );
};

export default Auction;
