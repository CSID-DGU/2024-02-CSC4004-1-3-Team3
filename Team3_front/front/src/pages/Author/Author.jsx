import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import './Author.css';

const Author = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [isPopular, setIsPopular] = useState(false); // 인기순 활성화 여부

  const openModal = index => {
    setSelectedItem(items[index]);
    setShowModal(true);
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

  useEffect(() => {
    // API 호출로 데이터 가져오기
    fetch('https://port-0-opensw-m3e7ph25a50cae42.sel4.cloudtype.app/author?follow=true')
      .then(res => res.json())
      .then(data => {
        const apiItems = data.responseDto.map(apiItem => ({
          id: apiItem.id,
          title: apiItem.name,
          followers: apiItem.followerCount || 0, // 팔로워 수가 0일 때도 0으로 설정
          image: 'path/to/image.jpg', // 이미지 경로는 예시로 설정
          isAPI: true,
        }));
        setItems(apiItems);
      })
      .catch(error => console.error('Error fetching API:', error));
  }, []);

  // 정렬 처리 (isPopular 상태에 따라)
  const sortedItems = isPopular
    ? [...items].sort((a, b) => b.followers - a.followers) // 팔로워 수 기준 내림차순
    : items; // 최신순(원래 순서)

  return (
    <div className="container">
      <div className="sort-filter">
        <span
          className={`sort-item ${!isPopular ? 'active' : ''}`}
          onClick={() => setIsPopular(false)}
        >
          최신순
        </span>
        <span> | </span>
        <span
          className={`sort-item ${isPopular ? 'active' : ''}`}
          onClick={() => setIsPopular(true)}
        >
          인기순
        </span>
      </div>
      <div className="art-grid">
        {sortedItems.map((item, index) => (
          <div key={index} className="art-card" onClick={() => openModal(index)}>
            <div className="art-image">
              <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%' }} />
            </div>
            <div className="art-text">
              <h3 className="art-title">{item.title}</h3> {/* 작가 이름 표시 */}
              <div className="art-followers">
                <span className="follower-icon">👥</span>
                <span className="follower-count">{item.followers}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <Modal
          show={showModal}
          onClose={closeModal}
          selectedItem={selectedItem}
          updateFollowers={updateFollowers}
        />
      )}
    </div>
  );
};

export default Author;
