// src/components/WorkDescription.js
import React, { useState, useEffect } from 'react';
import worksData from './../component/works';
import './WorkDescription.css';

function WorkDescription({ id }) {
  const [item, setItem] = useState(null);

  useEffect(() => {
    const parsedId = parseInt(id, 10);
    if (!isNaN(parsedId)) {
      const foundItem = worksData[parsedId];
      setItem(foundItem || null);
    } else {
      setItem(null);
    }
  }, [id]);

  if (!item) return <p>작품 정보를 찾을 수 없습니다.</p>;

  return (
    <div className="art-description">
      <div
        className="art-dimensions"
        style={{
          width: `${item.data.w * 3}px`,
          height: `${item.data.h * 3}px`,
        }}
      >
        작품 치수
        <div className="width">
          {item.data.w}cm
          <div className="width-arrow" style={{ width: `${item.data.w * 3}px` }} />
        </div>
        <div className="height">
          {item.data.h}cm
          <div className="height-arrow" style={{ height: `${item.data.h * 3}px` }} />
        </div>
      </div>
      <h2>CONDITION REPORT</h2>
      <p>{item.data.condition}</p>
    </div>
  );
}

export default WorkDescription;
