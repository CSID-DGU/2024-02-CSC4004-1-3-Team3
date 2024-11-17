import React, { useState } from 'react';
import './Infor.css';

function Infor() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = e => {
    setTitle(e.target.value.slice(0, 40)); // 최대 40자 제한
  };

  const handleDescriptionChange = e => {
    setDescription(e.target.value.slice(0, 500)); // 최대 500자 제한
  };

  return (
    <div className="infor-container">
      <div className="radio-group">
        <label className="label-text">설정</label>
        <label className="radio-option">
          <input type="radio" name="setting" value="picture" />
          <span className="custom-radio"></span>
          PICTURE
        </label>
        <label className="radio-option">
          <input type="radio" name="setting" value="photo" />
          <span className="custom-radio"></span>
          PHOTO
        </label>
      </div>
      <div className="input-group">
        <label className="label-text">작품명</label>
        <textarea type="text" placeholder="작품명" value={title} onChange={handleTitleChange} />
        <p style={{ color: 'orange', float: 'right' }}>{title.length}/40</p>
        <p className="helper-text">
          최대 40자까지 입력할 수 있어요. 구매자가 작품을 보고 선택하는데 도움이 될 수 있는 정보를
          포함해보세요.
        </p>
      </div>
      <div className="input-group">
        <label className="label-text">작품설명</label>
        <textarea
          placeholder="작품설명"
          value={description}
          onChange={handleDescriptionChange}
        ></textarea>
        <p style={{ color: 'orange', float: 'right' }}>{description.length}/500</p>
        <p className="helper-text">최대 500자까지 입력할 수 있어요. 작품에 대해 설명해보세요</p>
      </div>
    </div>
  );
}

export default Infor;
