import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './WorkList.css';
import HeartIcon from './HeartIcon';
//import worksData from '../../../components/works.jsx';

function WorkList({ selectedType, currentPage }) {
  // 페이지 이동을 위한 useNavigate 훅 설정
  const navigate = useNavigate();

  const [works, setWorks] = useState([]); // 작품 데이터를 상태로 관리
  const itemsPerPage = 16; // 페이지당 아이템 수 설정

  const page = currentPage;

  useEffect(() => {
    fetch('https://port-0-opensw-m3e7ph25a50cae42.sel4.cloudtype.app/works')
      .then(response => response.json())
      .then(data => {
        if (data.success && Array.isArray(data.responseDto)) {
          const processedWorks = data.responseDto.map(item => ({
            id: item.id,
            name: item.name,
            author_id: item.authorName,
            size_width: item.sizeWidth,
            size_height: item.sizeHeight,
            year: item.makeTime,
            mainimg: item.url || 'default_image_url.jpg',
            is_photo: item.photo,
            liked: false,
            type: item.photo ? 'PHOTO' : 'PICTURE',
            auction: 'none',
            price: 0,
          }));
          setWorks(processedWorks);
        } else {
          console.error('Invalid data format:', data);
          setWorks([]); // 빈 배열 설정
        }
      })
      .catch(error => {
        console.error('Error fetching works:', error);
        setWorks([]); // 오류 발생 시 빈 배열
      });
  }, []);

  // 선택된 타입에 따라 작품 데이터를 필터링하고 원본 배열의 인덱스를 유지한 새로운 배열 생성
  const filteredItems =
    selectedType === 'ALL'
      ? Array.isArray(works)
        ? works.map((item, index) => ({ ...item, originalIndex: index }))
        : []
      : Array.isArray(works)
        ? works
            .map((item, index) => ({ ...item, originalIndex: index }))
            .filter(
              item =>
                (selectedType === 'PICTURE' && item.is_photo === false) ||
                (selectedType === 'PHOTO' && item.is_photo === true)
            )
        : [];

  // 현재 페이지의 시작 인덱스 계산
  const startIndex = (page - 1) * itemsPerPage;
  // 현재 페이지에 표시될 아이템들 선택
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  // 카드 클릭 시 원본 데이터의 인덱스를 사용하여 페이지 이동
  const handleCardClick = (originalIndex, event) => {
    if (event.target.classList.contains('heart-icon')) return;
    navigate(`/artwork/${originalIndex}`);
  };

  // 좋아요 상태를 토글하는 함수
  const toggleLike = index => {
    const workIndex = startIndex + index;
    const updatedWorks = [...works];
    updatedWorks[workIndex] = {
      ...updatedWorks[workIndex],
      liked: !updatedWorks[workIndex].liked,
    };

    setWorks(updatedWorks);

    // 서버에 상태 업데이트
    fetch(`https://your-backend-api/works/${updatedWorks[workIndex].id}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ liked: updatedWorks[workIndex].liked }),
    }).catch(error => {
      console.error('Failed to update like status:', error);
    });
  };

  return (
    <div className="work-list">
      {currentItems.map((work, id) => (
        <div
          key={id}
          className="work-card"
          onClick={event => handleCardClick(work.originalIndex, event)}
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
                      <h3>{work.author_id}</h3>
                      <p>
                        {work.ingredient}
                        <br />
                        {work.size_width}X{work.size_height}cm | {work.year}
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
                <div className="imgprint" onClick={() => toggleLike(id)}>
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
