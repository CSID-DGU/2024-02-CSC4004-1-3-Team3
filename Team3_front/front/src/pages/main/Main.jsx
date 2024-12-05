import React, { useEffect, useState } from 'react';
import './Main.css';
import OrangeUnderLine from '../../img/OrangeUnderLine.png';
import BannerEx from '../../img/BannerEx.png';
import { useNavigate } from 'react-router-dom';
import AuctionModal from '../Auction/Modal/AuctionModal';
import Modal from '../Author/Modal';

const Main = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    ongoingAuctions: [],
    popularPictures: [],
    popularAuthors: [],
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [selectedItemAuthor, setSelectedItemAuthor] = useState(null);

  const baseURL = 'https://port-0-opensw-m3e7ph25a50cae42.sel4.cloudtype.app';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/main`);
        const result = await response.json();
        if (result.success) {
          console.log(result.responseDto);
          setData(result.responseDto);
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 에러 발생:', error);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = id => {
    console.log('클릭됌');
    navigate(`/artWork/${id}`);
  };

  const handleAuthorCardClick = id => {
    console.log('클릭됌');
    navigate(`/author`);
  };

  const handleAuctionCardClick = item => {
    console.log(item);
    setSelectedItem(item);
    setShowModal(true);
    console.log(selectedItem);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const openModal = index => {
    setSelectedItemAuthor(data.popularAuthors[index]);
    setShowModal(true);

    console.log(data.popularAuthors);

    console.log(selectedItemAuthor);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const updateFollowers = (id, newCount) => {
    setItems(prevItems =>
      prevItems.map(item => (item.id === id ? { ...item, followers: newCount } : item))
    );
  };
  return (
    <div className="root-container">
      <div className="main-container">
        {/* 상단 배너 */}
        <div className="banner">
          <img src={BannerEx} alt="Banner" className="banner-image" />
        </div>

        {/* HOT 섹션 */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">🔥 HOT</h2>
            <a href="/artwork" className="view-more">
              전체보기 &gt;
            </a>
          </div>
          <img src={OrangeUnderLine} className="underbar" />
          <div className="item-list">
            {data.popularPictures.slice(0, 5).map(item => (
              <div
                key={item.id}
                className="item-card-main"
                onClick={() => handleCardClick(item.id)}
              >
                <div
                  className="item-placeholder"
                  style={{ backgroundImage: `url(${item.url})` }}
                ></div>
                <p className="item-title">{item.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 경매중 섹션 */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">경매중</h2>
            <a href="/auction/ongoing" className="view-more">
              전체보기 &gt;
            </a>
          </div>
          <img src={OrangeUnderLine} className="underbar" />
          <div className="item-list">
            {data.ongoingAuctions.slice(0, 5).map(auction => (
              <div
                key={auction.id}
                className="item-card-main"
                onClick={() => handleAuctionCardClick(auction)}
              >
                <div
                  className="item-placeholder"
                  style={{ backgroundImage: `url(${auction.url})` }}
                ></div>
                <p className="item-title">
                  시작가 {auction.startPrice}원<br />
                  현재가 {auction.ingPrice}원
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 인기 작가 섹션 */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">인기 작가</h2>
            <a href="/author" className="view-more">
              전체보기 &gt;
            </a>
          </div>
          <img src={OrangeUnderLine} className="underbar" />
          <div className="circle-list">
            {data.popularAuthors.map((author, index) => (
              <div key={author.id} className="circle-item" onClick={() => openModal(index)}>
                <div
                  className="circle-placeholder"
                  style={{ backgroundImage: `url(${author.url})` }}
                ></div>
                <p className="circle-title">{author.name}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {selectedItem && (
        <AuctionModal show={showModal} onClose={handleCloseModal} item={selectedItem} />
      )}

      {showModal && (
        <Modal
          show={showModal}
          onClose={closeModal}
          selectedItem={selectedItemAuthor}
          updateFollowers={updateFollowers}
        />
      )}

      {/* 하단 푸터 */}
      <footer className="footer">
        <p>푸터</p>
      </footer>
    </div>
  );
};

export default Main;
