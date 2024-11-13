// components/Pagination.js
import React from 'react';
import './Pagination.css';

function Pagination({ page, onPageChange }) {
  // 'lt' 버튼 클릭 시 페이지 감소
  const handlePrevClick = () => {
    if (page > 1) onPageChange(page - 1);
  };

  // 'gt' 버튼 클릭 시 페이지 증가
  const handleNextClick = () => {
    onPageChange(page + 1);
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevClick} disabled={page === 1}>
        &lt;
      </button>
      <span>{page}</span>
      <button onClick={handleNextClick}>&gt;</button>
    </div>
  );
}

export default Pagination;
