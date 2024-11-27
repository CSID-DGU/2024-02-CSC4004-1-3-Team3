import React, { useState } from 'react';
import './Picture.css';
import './Infor.css';
import './Detail.css';
import './ArtworkRegistration.css';

function ArtworkRegistration({ userId }) {
  const [images, setImages] = useState([]);
  const [materials, setMaterials] = useState('');
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [year, setYear] = useState('');
  const [condition, setCondition] = useState('');
  const [isPhoto, setIsPhoto] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleFileChange = event => {
    const files = event.target.files;
    const fileArray = Array.from(files);
    setImages(prevImages => [...prevImages, ...fileArray]);
  };

  const handleRegister = async () => {
    if (!title || !description || images.length === 0 || !materials || !height || !width || !year) {
      alert('모든 필드를 채워주세요!');
      return;
    }

    const formData = new FormData();
    formData.append('userId', userId); // 사용자 ID 예시
    formData.append('pictureName', title);
    formData.append('description', description);
    formData.append('ingredient', materials);
    formData.append('sizeWidth', width);
    formData.append('sizeHeight', height);
    formData.append('makeTime', year);
    formData.append('pictureCondition', condition);
    formData.append('isPhoto', isPhoto);

    images.forEach(file => {
      formData.append('images', file);
    });

    try {
      const response = await fetch('https://your-backend-api-url.com/endpoint', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setShowModal(true);
      } else {
        alert('작품 등록 실패');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('서버 오류가 발생했습니다.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="artwork-registration">
      <div className="workadd-rowarray">
        <div className="picture-container">
          <div className="main-picture">
            {images[0] ? <img src={URL.createObjectURL(images[0])} alt="Main" /> : <p>main</p>}
          </div>
          <div className="thumbnail-row">
            {images.slice(1).map((image, index) => (
              <div key={index} className="thumbnail">
                <img src={URL.createObjectURL(image)} alt={`Thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>
          <button
            className="add-button"
            onClick={() => document.getElementById('fileInput').click()}
          >
            사진 추가
          </button>
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </div>
      </div>
      <div className="workadd-rowarray">
        {/* Infor Section */}
        <div className="infor-container">
          <div className="radio-group">
            <label className="label-text">설정</label>
            <label className="radio-option">
              <input
                type="radio"
                name="setting"
                value="picture"
                checked={!isPhoto}
                onChange={() => setIsPhoto(false)}
              />
              <span className="custom-radio"></span>
              PICTURE
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="setting"
                value="photo"
                checked={isPhoto}
                onChange={() => setIsPhoto(true)}
              />
              <span className="custom-radio"></span>
              PHOTO
            </label>
          </div>
          <div className="input-group">
            <label className="label-text">작품명</label>
            <textarea
              type="text"
              placeholder="작품명"
              value={title}
              onChange={e => setTitle(e.target.value.slice(0, 40))}
            />
            <p style={{ color: 'orange', float: 'right' }}>{title.length}/40</p>
            <p className="helper-text">
              최대 40자까지 입력할 수 있어요. 구매자가 작품을 보고 선택하는데 도움이 될 수 있는
              정보를 포함해보세요.
            </p>
          </div>
          <div className="input-group">
            <label className="label-text">작품설명</label>
            <textarea
              placeholder="작품설명"
              value={description}
              onChange={e => setDescription(e.target.value.slice(0, 500))}
            ></textarea>
            <p style={{ color: 'orange', float: 'right' }}>{description.length}/500</p>
            <p className="helper-text">최대 500자까지 입력할 수 있어요. 작품에 대해 설명해보세요</p>
          </div>
        </div>
      </div>
      <div className="workadd-rowarray">
        {/* Detail Section */}
        <div className="detail-container">
          <div className="input-group">
            <label className="label-text">사용 재료</label>
            <textarea
              type="text"
              placeholder="사용 재료"
              value={materials}
              onChange={e => setMaterials(e.target.value)}
            />
            <p className="helper-text">예시: 캔버스에 아크릴</p>
          </div>
          <div className="input-group">
            <label className="label-text">작품 크기</label>
            <div className="size-inputs">
              <textarea
                type="text"
                placeholder="세로"
                value={height}
                onChange={e => setHeight(e.target.value)}
              />
              <p>X</p>
              <textarea
                type="text"
                placeholder="가로"
                value={width}
                onChange={e => setWidth(e.target.value)}
              />
            </div>
            <p className="helper-text">숫자만 입력</p>
          </div>
          <div className="input-group">
            <label className="label-text">제작 연도</label>
            <textarea
              type="text"
              placeholder="제작 연도"
              value={year}
              onChange={e => setYear(e.target.value)}
            />
            <p className="helper-text">숫자만 입력</p>
          </div>
          <div className="input-group">
            <label className="label-text">Condition Report</label>
            <textarea
              placeholder="condition report"
              value={condition}
              onChange={e => setCondition(e.target.value)}
            />
            <p className="helper-text">예시: 실물 확인 필수</p>
          </div>
        </div>

        {/* Submit Button */}
        <button className="submit-button" onClick={handleRegister}>
          작품 등록
        </button>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>작품 등록이 완료되었습니다.</p>
            <button className="modal-button" onClick={handleCloseModal}>
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArtworkRegistration;
