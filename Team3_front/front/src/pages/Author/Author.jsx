import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import './Author.css';

const Author = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [isPopular, setIsPopular] = useState(false); // 인기순 활성화 여부
  const baseURL = 'https://port-0-opensw-m3e7ph25a50cae42.sel4.cloudtype.app';

  const openModal = async index => {
    const selectedAuthor = items[index];
    try {
      const response = await fetch(`${baseURL}/author/${selectedAuthor.id}`);
      const result = await response.json();

      if (result.success) {
        setSelectedItem(result.responseDto);
        setShowModal(true);
      } else {
        console.error('작가 상세 정보를 가져오는데 실패했습니다.');
      }
    } catch (error) {
      console.error('작가 상세 정보 조회 중 오류 발생:', error);
    }
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
    const fetchAuthors = async () => {
      try {
        const response = await fetch(`${baseURL}/author?follow=${isPopular}`);
        const data = await response.json();

        if (data.success) {
          const apiItems = data.responseDto.map(author => ({
            id: author.id,
            title: author.userName,
            followers: author.followersCount || 0,
            image: author.userImage,
            email: author.userEmail,
            isAPI: true,
          }));
          setItems(apiItems);
        }
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };

    fetchAuthors();
  }, [isPopular]);

  return (
    <div className="container">
      <div className="sort-filter">
        <span
          className={`sort-item ${!isPopular ? 'active' : ''}`}
          onClick={() => setIsPopular(false)}
        >
          이름순
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
        {items.map((item, index) => (
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
