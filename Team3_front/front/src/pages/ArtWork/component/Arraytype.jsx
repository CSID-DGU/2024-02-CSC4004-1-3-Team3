import React, { useState } from 'react';
import WorkList from './WorkList';
import './Arraytype.css';

function Arraytype({ paginationState }) {
  // selectedType의 초기값을 'ALL'로 설정
  const [selectedType, setSelectedType] = useState('ALL');
  const page = paginationState;
  return (
    <div className="array-type">
      <div className="column">
        {/*버튼 선택에 따라 selectedType이 바뀜*/}
        <button
          className={selectedType === 'ALL' ? 'active' : ''}
          onClick={() => setSelectedType('ALL')}
        >
          ALL
        </button>
        <span>|</span>
        <button
          className={selectedType === 'PICTURE' ? 'active' : ''}
          onClick={() => setSelectedType('PICTURE')}
        >
          PICTURE
        </button>
        <span>|</span>
        <button
          className={selectedType === 'PHOTO' ? 'active' : ''}
          onClick={() => setSelectedType('PHOTO')}
        >
          PHOTO
        </button>
        {/* WorkList에 selectedType과 page를 전달 */}
        <div className="tab-content">
          <div className="section work-list-section">
            <WorkList selectedType={selectedType} currentPage={page} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Arraytype;
