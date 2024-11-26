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

  // 정렬 함수
  const sortList = option => {
    const sortedList = [...auctionList];
    if (option === 'latest') {
      sortedList.sort((a, b) => new Date(b.startAt) - new Date(a.startAt)); // 최신순 정렬
    } else if (option === 'popular') {
      sortedList.sort((a, b) => b.popularity - a.popularity); // 인기순 정렬
    }
    setAuctionList(sortedList);
  };

  // 클릭 이벤트 핸들러
  const handleSortClick = option => {
    setSortOption(option); // 정렬 기준 업데이트
    sortList(option); // 리스트 정렬
  };

  return (
    <div className="auction-container">
      <div className="auction-header">
        <span
          className={`sort-option ${sortOption === 'latest' ? 'active' : ''}`}
          onClick={() => handleSortClick('latest')}
        >
          최신순
        </span>
        |
        <span
          className={`sort-option ${sortOption === 'popular' ? 'active' : ''}`}
          onClick={() => handleSortClick('popular')}
        >
          인기순
        </span>
      </div>
      <h1 className="auction-title">COMPLETED AUCTION</h1>

      {auctionList.map((item, index) => (
        <AuctionItem
          key={index}
          image={item.picture.imageUrl}
          title={item.picture.name}
          artist={item.artist}
          completed={true}
        />
      ))}
    </div>
  );
};

export default Auction;
