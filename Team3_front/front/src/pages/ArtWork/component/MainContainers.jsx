import React, { useState } from 'react';
import Arraytype from './Arraytype';
import Pagination from './Pagination';
import './MainContainers.css';

function MainContainers() {
  // 페이지 번호를 관리하는 상태를 정의 (초기값은 1)
  const [paginationState, setPaginationState] = useState(1);

  // 페이지가 변경될 때 호출되는 함수, 새로운 페이지 번호로 상태를 업데이트
  const handlePageChange = newPage => {
    setPaginationState(newPage);
  };

  return (
    <div className="content-container">
      <div className="section arraytype-section">
        {/* paginationState를 Arraytype 컴포넌트에 전달 */}
        <Arraytype paginationState={paginationState} />
      </div>
      <div className="section pagination-section">
        {/* 페이지 변경 시 handlePageChange 함수를 호출 */}
        <Pagination page={paginationState} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}

export default MainContainers;
