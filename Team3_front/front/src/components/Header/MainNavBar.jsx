// Header.js
import React from 'react';
import './MainNavBar.css'; // 스타일 파일 연결
import Logo from '../../img/MainLogo.png';
import SearchIcon from '../../img/SearchIcon.png';

const MainNavBar = () => {
  return (
    <header className="header">
      <div className="header-left">
        <img src={Logo} alt="팔아보자GO" className="header-logo" />
      </div>

      <div className="header-center">
        <h1 className="header-title">ARTIST</h1>
        <div className="header-search">
          <img src={SearchIcon} alt="돗보기" className="search-icon" />
          <input type="text" placeholder="검색" className="search-input" />
        </div>
      </div>

      <div className="header-right">
        <a href="login" className="header-link">
          login
        </a>
        <span className="divider">|</span>
        <a href="mypage" className="header-link">
          mypage
        </a>
      </div>

      <div className="header-bottom">
        <nav className="header-nav">
          <a href="artwork" className="nav-link">
            작품
          </a>
          <a href="author" className="nav-link">
            작가
          </a>
          <a href="auction" className="nav-link">
            경매
          </a>
        </nav>
      </div>
    </header>
  );
};

export default MainNavBar;
