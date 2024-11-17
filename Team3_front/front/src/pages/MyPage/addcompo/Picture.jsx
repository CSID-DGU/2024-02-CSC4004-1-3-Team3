import React, { useState } from 'react';
import './Picture.css';

function Picture() {
  const [images, setImages] = useState([]);

  const handleFileChange = event => {
    const files = event.target.files;
    const fileArray = Array.from(files).map(file => URL.createObjectURL(file));
    setImages(prevImages => [...prevImages, ...fileArray]);
  };

  return (
    <div className="picture-container">
      <div className="main-picture">
        {images[0] ? <img src={images[0]} alt="Main" /> : <p>main</p>}
      </div>
      <div className="thumbnail-row">
        {images.slice(1).map((image, index) => (
          <div key={index} className="thumbnail">
            <img src={image} alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>
      <button className="add-button" onClick={() => document.getElementById('fileInput').click()}>
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
  );
}

export default Picture;
