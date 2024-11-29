import React, { useEffect, useState } from 'react';
import './Auction.css';
import AuctionItem from './AuctionItem';

const Auction = () => {
  // 상태 관리: 정렬 기준과 정렬된 리스트
  const [sortOption, setSortOption] = useState('latest'); // 초기값: 최신순
  const [auctionList, setAuctionList] = useState([]);

  const baseURL = 'https://port-0-opensw-m3e7ph25a50cae42.sel4.cloudtype.app';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/auction/finish`);
        const result = await response.json();
        if (result.success) {
          console.log(result.responseDto);
          setAuctionList(result.responseDto);
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 에러 발생:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="auction-container">
      <h1 className="auction-title">COMPLETED AUCTION</h1>

      {auctionList.map((item, index) => (
        <AuctionItem
          key={index}
          image={item.picture.imageUrl}
          title={item.picture.name}
          artist={item.authorName}
          completed={true}
        />
      ))}
    </div>
  );
};

export default Auction;
