import React, { useState } from 'react';
import './SignUp.css';

function SignUpStep2() {
  // 상태값으로 현재 회원 유형을 저장
  const [isPersonalMember, setIsPersonalMember] = useState(true); // 기본값은 개인 회원

  // "개인 회원" 버튼 클릭 시 호출
  const handlePersonalClick = () => {
    setIsPersonalMember(true);
  };

  // "예술가 회원" 버튼 클릭 시 호출
  const handleArtistClick = () => {
    setIsPersonalMember(false);
  };

  return (
    <div className="signup-page">
      {/* 제목 변경 */}
      <h2>{isPersonalMember ? '개인회원 가입' : '예술가 회원 가입'}</h2>
      <div className="signup-tabs">
        {/* 버튼 활성화 스타일 추가 */}
        <button className={`tab ${isPersonalMember ? 'active' : ''}`} onClick={handlePersonalClick}>
          개인 회원
        </button>
        <button className={`tab ${!isPersonalMember ? 'active' : ''}`} onClick={handleArtistClick}>
          예술가 회원
        </button>
      </div>
      <form className="signup-form">
        <label>
          아이디
          <input type="text" placeholder="4-20자리 / 영문, 숫자 사용 가능" />
        </label>
        <label>
          비밀번호
          <input type="password" placeholder="8-16자리 / 영문, 숫자, 특수문자 조합" />
        </label>
        <label>
          이메일
          <input type="email" placeholder="email@example.com" />
        </label>
        <div className="terms">
          <input type="checkbox" id="agree-all" />
          <label htmlFor="agree-all">전체 동의</label>
          <input type="checkbox" id="agree-1" />
          <label htmlFor="agree-1">(필수) 개인정보 약관에 동의</label>
          <input type="checkbox" id="agree-2" />
          <label htmlFor="agree-2">(선택) 마케팅 정보 수신 동의</label>
        </div>
        <button type="submit" className="signup-btn">
          회원가입 완료
        </button>
      </form>
    </div>
  );
}

export default SignUpStep2;
