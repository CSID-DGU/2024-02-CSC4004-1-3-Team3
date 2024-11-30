import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import './Author.css';

const Author = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([
    { id: 1, title: '김민설1', followers: 10, image: 'path/to/image1.jpg', isAPI: true },
    { id: 2, title: '김민설2', followers: 25, image: 'path/to/image2.jpg', isAPI: true },
    { id: 3, title: '김민설3', followers: 34, image: 'path/to/image3.jpg', isAPI: false },
    { id: 4, title: '김민설4', followers: 15, image: 'path/to/image4.jpg', isAPI: false },
    { id: 5, title: '김민설5', followers: 45, image: 'path/to/image5.jpg', isAPI: false },
    { id: 6, title: '김민설6', followers: 18, image: 'path/to/image6.jpg', isAPI: false },
    { id: 7, title: '김민설7', followers: 20, image: 'path/to/image7.jpg', isAPI: false },
    { id: 8, title: '김민설8', followers: 8, image: 'path/to/image8.jpg', isAPI: false },
  ]);

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
    fetch('https://port-0-opensw-m3e7ph25a50cae42.sel4.cloudtype.app/author?follow=true')
      .then(res => res.json())
      .then(data => {
        setItems(prevItems =>
          prevItems.map(item => {
            if (item.isAPI) {
              const apiItem = data.responseDto.find(apiItem => apiItem.id === item.id);
              return { ...item, followers: apiItem?.followers || item.followers };
            }
            return item;
          })
        );
      })
      .catch(error => console.error('Error fetching API:', error));
  }, []); // 빈 배열로 유지

  return (
    <div className="container">
      <div className="sort-filter">
        <span className="sort-item active">최신순</span>
        <span> | </span>
        <span className="sort-item">인기순</span>
      </div>
      <div className="art-grid">
        {items.map((item, index) => (
          <div key={index} className="art-card" onClick={() => openModal(index)}>
            <div className="art-image">
              <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%' }} />
            </div>
            <div className="art-text">
              <h3 className="art-title">{item.title}</h3>
              <p className="art-details">{item.details}</p>
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
