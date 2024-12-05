import React from 'react';
import MainContainers from './addcompo/MainContainers';

function AddArtworkPage() {
  return (
    <div className="container">
      <MainContainers /> {/* userId를 MainContainers로 전달 */}
    </div>
  );
}

export default AddArtworkPage;
