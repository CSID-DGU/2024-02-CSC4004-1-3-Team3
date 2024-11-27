import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ArtDetail.css';
import MainContainers from './detailcompo/MainContainers';

function ArtDetail() {
  // URL 경로에서 'id' 매개변수를 추출하여 작품 ID로 사용
  const { id } = useParams();

  const [artwork, setArtwork] = useState(null); // 작품 데이터 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const response = await fetch(
          `https://port-0-opensw-m3e7ph25a50cae42.sel4.cloudtype.app/picture/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched artwork data:', data); // 디버깅용 로그
        setArtwork(data.responseDto); // API 형식에 따라 responseDto를 사용
      } catch (err) {
        console.error('Error fetching artwork:', err);
        setError('Failed to load artwork data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtwork();
  }, [id]);

  // 로딩 중일 경우 표시
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 에러 발생 시 표시
  if (error) {
    return <div className="error">{error}</div>;
  }

  // 데이터가 없는 경우 처리
  if (!artwork) {
    return <div>No artwork found.</div>;
  }

  return (
    <div className="container">
      {/* MainContainers 컴포넌트에 artworkId를 props로 전달 */}
      <MainContainers artworkId={artwork.id} />
    </div>
  );
}

export default ArtDetail;
