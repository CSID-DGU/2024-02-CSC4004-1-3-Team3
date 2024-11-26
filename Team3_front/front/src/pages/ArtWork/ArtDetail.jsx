// components/ArtDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ArtDetail.css';
import MainContainers from './detailcompo/MainContainers';

function ArtDetail() {
  // URL 경로에서 'id' 매개변수를 추출하여 작품 ID로 사용
  const { id } = useParams();

  const [artwork, setArtwork] = useState(null);

  useEffect(() => {
    // 백엔드 API 호출
    fetch(`https://port-0-opensw-m3e7ph25a50cae42.sel4.cloudtype.app/works/${id}`)
      .then(response => response.json())
      .then(data => {
        setArtwork(data); // 가져온 데이터를 상태에 설정
      })
      .catch(error => {
        console.error('Error fetching artwork:', error); // 오류 처리
      });
  }, [id]);

  if (!artwork) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container">
      {/* MainContainers 컴포넌트에 id를 props로 전달 */}
      <MainContainers artwork={artwork} />
    </div>
  );
}

export default ArtDetail;
