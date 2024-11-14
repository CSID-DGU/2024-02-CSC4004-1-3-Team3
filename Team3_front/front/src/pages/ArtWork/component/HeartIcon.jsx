import React from 'react';
import filledHeart from '../../../img/heart-shape-red.png';
import emptyHeart from '../../../img/heart-shape-white.png';

function HeartIcon({ liked }) {
  return (
    <img
      src={liked ? filledHeart : emptyHeart}
      alt="heart icon"
      style={{ width: '18px', height: '18px' }}
      className="heart-icon"
    />
  );
}

export default HeartIcon;
