import React from 'react';
import BackButton from './BackButton';
import Art from './Art';
//import Details from './Details';
import Tabs from './Tabs';
import Share from './Share';
import './MainContainers.css';

function MainContainers({ id }) {
  return (
    <div className="content-container">
      <div className="sec backbutton-section">
        <BackButton />
      </div>
      <div className="sec art-details-section">
        <Art id={id} />
      </div>
      <div className="sec share-section">
        <Share />
      </div>
      <div className="sec tabs-section">
        <Tabs id={id} />
      </div>
    </div>
  );
}

export default MainContainers;
