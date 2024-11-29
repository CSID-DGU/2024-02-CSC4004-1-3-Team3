import React, { useEffect, useState } from 'react';
import './Auction.css';
import AuctionItem from './AuctionItem';
import AuctionModal from './Modal/AuctionModal';

const Auction = () => {
  const [sortOption, setSortOption] = useState('latest');
  const [auctionList, setAuctionList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const baseURL = 'https://port-0-opensw-m3e7ph25a50cae42.sel4.cloudtype.app';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/auction`);
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
      sortedList.sort((a, b) => new Date(b.startAt) - new Date(a.startAt));
    } else if (option === 'popular') {
      sortedList.sort((a, b) => b.popularity - a.popularity);
    }
    setAuctionList(sortedList);
  };

  // 클릭 이벤트 핸들러
  const handleSortClick = option => {
    setSortOption(option);
    sortList(option);
  };

  // 모달 열기
  const handleItemClick = item => {
    setSelectedItem(item);
    setShowModal(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  return (
    <div className="auction-container">
      <h1 className="auction-title">AUCTION IN PROGRESS</h1>

      {auctionList.map((item, index) => (
        <AuctionItem
          key={index}
          image={item.picture.imageUrl}
          title={item.picture.name}
          artist={item.authorName}
          minBid={item.startPrice}
          currentBid={item.ingPrice}
          completed={false}
          onClick={() => handleItemClick(item)} // 클릭 시 아이템 정보로 모달 표시
        />
      ))}

      {selectedItem && (
        <AuctionModal show={showModal} onClose={handleCloseModal} item={selectedItem} />
      )}
    </div>
  );
};

export default Auction;
