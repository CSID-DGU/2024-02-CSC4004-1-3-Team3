import React from 'react';
import './Author.css';

const Author = () => {
  return (
    <div className="container">
      <div className="sort-filter">
        <span className="sort-item active">최신순</span>
        <span>|</span>
        <span className="sort-item">인기순</span>
      </div>
      <div className="art-grid">
        {[...Array(8)].map((_, index) => (
          <div className="art-card" key={index}>
            <div className="art-image"></div>
            <div className="art-text">
              <div className="art-title">김민설</div>
              <div className="art-details">소나무 종이에 마커</div>
              <div className="art-details">65X90cm | 2019</div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button className="page-button">{'<'}</button>
        <button className="page-button">1</button>
        <button className="page-button">{'>'}</button>
      </div>
    </div>
  );

};

export default Author;
