// ArtWork.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import MainContainers from './component/MainContainers';
//import './ArtWork.css';

function ArtWork() {
  return (
    <div className="ArtWork">
      <main>
        <MainContainers />
        <Outlet /> {}
      </main>
    </div>
  );
}

export default ArtWork;
