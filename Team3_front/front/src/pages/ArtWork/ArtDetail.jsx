// components/ArtDetail.js
import React /*, { useEffect }*/ from 'react';
import { useParams } from 'react-router-dom';
import './ArtDetail.css';
import MainContainers from './detailcompo/MainContainers';

function ArtDetail() {
  // URL 경로에서 'id' 매개변수를 추출하여 작품 ID로 사용
  const { id } = useParams();

  /*
  useEffect(() => {
    console.log('Artwork ID:', id);
  }, [id]);
  */
  return (
    <div className="container">
      {/* MainContainers 컴포넌트에 id를 props로 전달 */}
      <MainContainers id={id} />
    </div>
  );
}

export default ArtDetail;
