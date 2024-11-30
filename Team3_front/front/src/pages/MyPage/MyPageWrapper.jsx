// MyPageWrapper.jsx
import React from 'react';
import MyPageArtist from './MyPage_artist';
import MyPagePersonal from './MyPage_personal';

const MyPageWrapper = () => {
  const isAuthor = localStorage.getItem('isAuthor') === 'true'; // author 상태 확인
  return isAuthor ? <MyPageArtist /> : <MyPagePersonal />;
};

export default MyPageWrapper;
