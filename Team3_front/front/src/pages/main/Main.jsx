import React from 'react';
import './Main.css';
import OrangeUnderLine from '../../img/OrangeUnderLine.png';
import BannerEx from '../../img/BannerEx.png';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();

  const handleCardClick = index => {
    console.log('클릭됌');
    navigate(`/artWork/${index}`);
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
            {[...Array(5)].map((_, index) => (
              <div key={index} className="item-card" onClick={() => handleCardClick(index)}>
                {/* 여기에 아이템 이미지와 제목을 추가할 수 있음 */}
                <div className="item-placeholder"></div>
                <p className="item-title">상품 이름</p>
              </div>
            ))}
          </div>
        </section>

        {/* 경매중 섹션 */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">경매중</h2>
            <a href="/auction" className="view-more">
              전체보기 &gt;
            </a>
          </div>
          <img src={OrangeUnderLine} className="underbar" />
          <div className="item-list">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="item-card">
                <div className="item-placeholder"></div>
                <p className="item-title">상품 이름</p>
              </div>
            ))}
          </div>
        </section>

        {/* 인기 작가 섹션 */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">인기 작가</h2>
            <a href="" className="view-more">
              전체보기 &gt;
            </a>
          </div>
          <img src={OrangeUnderLine} className="underbar" />
          <div className="circle-list">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="circle-item">
                <div className="circle-placeholder"></div>
                <p className="circle-title">작가 이름</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 하단 푸터 */}
      <footer className="footer">
        <p>푸터</p>
      </footer>
    </div>
  );
};

export default Main;
