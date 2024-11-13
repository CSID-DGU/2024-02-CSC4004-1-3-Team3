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
      <div className="section backbutton-section">
        <BackButton />
      </div>
      <div className="section art-details-section">
        <Art id={id} />
      </div>
      <div className="section share-section">
        <Share />
      </div>
      <div className="section tabs-section">
        <Tabs id={id} />
      </div>
    </div>
  );
}

export default MainContainers;
