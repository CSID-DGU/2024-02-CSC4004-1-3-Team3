import React, { useState, useEffect } from 'react';
import BackButton from './BackButton';
import Art from './Art';
import Tabs from './Tabs';
import Share from './Share';
import './MainContainers.css';

function MainContainers({ artworkId }) {
  const [artwork, setArtwork] = useState(null); // 작품 데이터를 관리할 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리
  const baseURL = 'https://port-0-opensw-m3e7ph25a50cae42.sel4.cloudtype.app';

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const response = await fetch(`${baseURL}/picture/${artworkId}`);
        const data = await response.json();

        console.log('API Response:', data); // 디버깅용 로그

        if (data.success && data.responseDto) {
          // API 데이터 구조에 맞게 artwork 상태 설정
          const artworkData = data.responseDto;
          const processedArtwork = {
            id: artworkData.id,
            name: artworkData.name,
            description: artworkData.description,
            ingredient: artworkData.ingredient,
            sizeWidth: artworkData.sizeWidth,
            sizeHeight: artworkData.sizeHeight,
            size: `${artworkData.sizeWidth} x ${artworkData.sizeHeight} cm`,
            year: artworkData.makeTime,
            condition: artworkData.pictureCondition,
            isPhoto: artworkData.isPhoto,
            createdAt: artworkData.createAt,
            author: {
              name: artworkData.authorName,
              email: artworkData.authorEmail,
              image: artworkData.authorImage || '/images/default-author-image.jpg',
            },
            images: artworkData.imageUrls || [],
          };

          setArtwork(processedArtwork);
        } else {
          console.error('Invalid data format or data not found:', data);
        }
      } catch (error) {
        console.error('Error fetching artwork data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (artworkId) {
      fetchArtwork();
    } else {
      console.error('Invalid artwork ID:', artworkId); // artworkId가 없는 경우 로그 출력
      setIsLoading(false); // 로딩 상태 해제
    }
  }, [artworkId]);

  // 로딩 중일 경우 메시지 표시
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // 데이터가 없을 경우 에러 메시지 표시
  if (!artwork) {
    return <p>Artwork not found.</p>;
  }

  return (
    <div className="content-container">
      <div className="sec backbutton-section">
        <BackButton />
      </div>
      <div className="sec art-details-section">
        <Art artwork={artwork} />
      </div>
      <div className="sec share-section">
        <Share />
      </div>
      <div className="sec tabs-section">
        <Tabs artwork={artwork} />
      </div>
    </div>
  );
}

export default MainContainers;
