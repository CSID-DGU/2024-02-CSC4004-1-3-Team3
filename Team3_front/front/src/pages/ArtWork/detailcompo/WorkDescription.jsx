// src/components/WorkDescription.js
import React from 'react';
//import worksData from '../../../components/works.jsx';
import './WorkDescription.css';

function WorkDescription({ artwork }) {
  if (!artwork) return <p>작품 정보를 찾을 수 없습니다.</p>;

  return (
    <div className="art-description">
      <div
        className="art-dimensions"
        style={{
          width: `${artwork.size_width * 3}px`,
          height: `${artwork.size_height * 3}px`,
        }}
      >
        작품 치수
        <div className="width">
          {artwork.sizeWidth}cm
          <div className="width-arrow" style={{ width: `${artwork.sizeWidth * 3}px` }} />
        </div>
        <div className="height">
          {artwork.sizeHeight}cm
          <div className="height-arrow" style={{ height: `${artwork.sizeHeight * 3}px` }} />
        </div>
      </div>
      <h2>CONDITION REPORT</h2>
      <p>{artwork.pictureCondition}</p>
    </div>
  );
}

export default WorkDescription;
