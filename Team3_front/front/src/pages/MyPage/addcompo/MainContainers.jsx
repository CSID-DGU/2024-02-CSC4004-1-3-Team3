import React from 'react';
import BackButton from './BackButton';
import Picture from './Picture';
import Infor from './Infor';
import Detail from './Detail';
import './MainContainers.css';

function MainContainers() {
  return (
    <div className="content-container">
      <div className="sec backbutton-section">
        <BackButton />
      </div>
      <div className="sections-container">
        <div className="picture-section">
          <Picture />
        </div>
        <div className="information-section">
          <Infor />
        </div>
        <div className="details-section">
          <Detail />
        </div>
      </div>
    </div>
  );
}

export default MainContainers;
