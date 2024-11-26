import React, { useState } from 'react'; // useState 추가
import './MainNavBar.css';
import Logo from '../../img/MainLogo.png';
import SearchIcon from '../../img/SearchIcon.png';
import { useLocation } from 'react-router-dom';

const MainNavBar = () => {
  const [showAuctionMenu, setShowAuctionMenu] = useState(false); // 상태 추가
  let Title = 'Main';
  const location = useLocation();

  if (location.pathname === '/') {
    Title = 'Main';
  } else if (location.pathname.startsWith('/artwork')) {
    Title = 'ArtWork';
  } else if (location.pathname.startsWith('/author')) {
    Title = 'Artist';
  } else if (location.pathname.startsWith('/auction')) {
    Title = 'Auction';
  } else if (location.pathname.startsWith('/mypage')) {
    Title = 'Mypage';
  } else {
    Title = 'Main';
  }

  return (
    <header className="Mainheader">
      <div className="header-left">
        <a href="/">
          <img src={Logo} alt="팔아보자GO" className="header-logo" />
        </a>
      </div>

      <div className="header-center">
        <h1 className="header-title">{Title}</h1>
        <div className="header-search">
          <img src={SearchIcon} alt="돗보기" className="search-icon" />
          <input type="text" placeholder="검색" className="search-input" />
        </div>
      </div>

      <div className="header-right">
        <a href="/login" className="header-link">
          login
        </a>
        <span className="divider">|</span>
        <a href="/mypage" className="header-link">
          mypage
        </a>
      </div>

      <div className="header-bottom">
        <nav className="header-nav">
          <a href="/artwork" className="nav-link">
            작품
          </a>
          <a href="/author" className="nav-link">
            작가
          </a>
          <div
            className="nav-link auction-link"
            onMouseEnter={() => setShowAuctionMenu(true)}
            onMouseLeave={() => setShowAuctionMenu(false)}
          >
            경매
            {showAuctionMenu && (
              <div className="dropdown-menu">
                <a href="/auction/ongoing" className="dropdown-item">
                  진행중 경매
                </a>
                <a href="/auction/completed" className="dropdown-item">
                  완료된 경매
                </a>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default MainNavBar;
