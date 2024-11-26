import React, { useState, useEffect } from 'react';
import BackButton from './BackButton';
import Art from './Art';
//import Details from './Details';
import Tabs from './Tabs';
import Share from './Share';
import './MainContainers.css';

function MainContainers({ artworkId }) {
  const [artwork, setArtwork] = useState(null); // 작품 데이터를 관리할 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const response = await fetch(
          `https://port-0-opensw-m3e7ph25a50cae42.sel4.cloudtype.app/artworks/${artworkId}`
        );
        const data = await response.json();
        if (data.success) {
          setArtwork(data.responseDto);
        } else {
          console.error('Failed to fetch artwork data:', data.error);
        }
      } catch (error) {
        console.error('Error fetching artwork data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (artworkId) {
      fetchArtwork();
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
