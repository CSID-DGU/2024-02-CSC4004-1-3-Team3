// src/components/Tabs.js
import React, { useState } from 'react';
import './Tabs.css';
import Details from './Details';

function Tabs({ artwork }) {
  // 선택된 탭 상태 관리
  const [activeTab, setActiveTab] = useState('작품 정보');

  // 탭 버튼 클릭 시 선택된 탭 상태 변경
  const handleTabClick = tabName => {
    setActiveTab(tabName);
  };

  return (
    <div className="tabs-container">
      <div className="tabs">
        <button
          className={activeTab === '작품 정보' ? 'active' : ''}
          onClick={() => handleTabClick('작품 정보')}
        >
          작품 정보
        </button>
        <button
          className={activeTab === '작가 정보' ? 'active' : ''}
          onClick={() => handleTabClick('작가 정보')}
        >
          작가 정보
        </button>
      </div>
      <div className="tab-content">
        {activeTab === '작품 정보' && (
          <div>
            <Details choice={1} artwork={artwork} />
          </div>
        )}
        {activeTab === '작가 정보' && (
          <div>
            <Details choice={2} artwork={artwork} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Tabs;
