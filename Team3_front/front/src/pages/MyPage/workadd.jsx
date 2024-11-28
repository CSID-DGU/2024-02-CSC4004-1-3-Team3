import React from 'react';
import { useLocation } from 'react-router-dom';
import MainContainers from './addcompo/MainContainers';

function AddArtworkPage() {
  const location = useLocation();
  const { userId } = location.state || {}; // userId를 전달받음

  return (
    <div className="container">
      <MainContainers userId={userId} /> {/* userId를 MainContainers로 전달 */}
    </div>
  );
}

export default AddArtworkPage;
