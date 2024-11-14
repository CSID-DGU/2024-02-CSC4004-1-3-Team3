import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WorkList.css';
import HeartIcon from './HeartIcon';
import worksData from './works';

function WorkList({ selectedType, currentPage }) {
  // 페이지 이동을 위한 useNavigate 훅 설정
  const navigate = useNavigate();

  const [works, setWorks] = useState(worksData); // 작품 데이터를 상태로 관리
  const itemsPerPage = 16; // 페이지당 아이템 수 설정

  const page = currentPage;

  // 선택된 타입에 따라 작품 데이터를 필터링
  const filteredItems =
    selectedType === 'ALL' ? works : works.filter(item => item.type === selectedType);

  // 현재 페이지의 시작 인덱스 계산
  const startIndex = (page - 1) * itemsPerPage;
  // 현재 페이지에 표시될 아이템들 선택
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  // 카드 클릭 시 페이지 이동 함수
  const handleCardClick = (index, event) => {
    // 좋아요 아이콘을 클릭했을 경우 이동을 방지
    if (event.target.classList.contains('heart-icon')) return;
    navigate(`/artwork/${startIndex + index}`);
  };
  // 좋아요 상태를 토글하는 함수
  const toggleLike = index => {
    setWorks(prevWorks => {
      const updatedWorks = [...prevWorks];
      const workIndex = startIndex + index; // 전체 배열에서 현재 작품의 인덱스
      updatedWorks[workIndex] = {
        ...updatedWorks[workIndex],
        liked: !updatedWorks[workIndex].liked,
      };
      return updatedWorks;
    });
  };

  return (
    <div className="work-list">
      {currentItems.map((work, index) => (
        <div
          key={index}
          className="work-card"
          onClick={event => handleCardClick(index, event)}
          style={{ cursor: 'pointer' }}
        >
          <div className="box-top">
            {/* 작품 이름 표시 */}
            <div className="work-details">
              <h3>{work.name}</h3>
            </div>
            {/* 작품 타입 표시 */}
            <div className="work-type">
              <p>{work.type}</p>
            </div>
          </div>
          <div className="box-bottom">
            {/* 작품 이미지 및 오버레이 정보 */}
            <div className="work-image">
              <img src={work.mainimg} alt="mainimg" style={{ width: 'auto', height: 'auto' }} />
              <div className="overlay">
                <div className="overlay-text">
                  <div className="work-bottom">
                    <div className="work-left">
                      {/* 작가명 및 작품 정보 표시 */}
                      <h3>{work.artist}</h3>
                      <p>
                        {work.material}
                        <br />
                        {work.size} | {work.year}
                      </p>
                    </div>
                    <div className="work-right">
                      {/* 경매 상태와 현재 가격 표시 (진행 중일 경우) */}
                      {work.auction === 'ongoing' && (
                        <p>
                          경매 진행 중
                          <br />
                          현재가: {work.price} KRW
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                {/* 좋아요 아이콘 클릭 시 좋아요 상태 토글 */}
                <div className="imgprint" onClick={() => toggleLike(index)}>
                  <HeartIcon liked={work.liked} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WorkList;
