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
      {/* 회원 유형 선택 탭 */}
      <div className="signup-tabs">
        <button className={`tab ${isPersonalMember ? 'active' : ''}`} onClick={handlePersonalClick}>
          개인 회원
        </button>
        <button className={`tab ${!isPersonalMember ? 'active' : ''}`} onClick={handleArtistClick}>
          예술가 회원
        </button>
      </div>

      {/* 회원가입 폼 */}
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

        {/* 약관 동의 섹션 */}
        <div className="terms-container">
          <h3 className="terms-title">약관</h3>
          <div className="terms-box">
            <div className="terms-item">
              <input type="checkbox" id="agree-all" />
              <label htmlFor="agree-all">
                <strong>전체 동의</strong>
                <p>마케팅 정보 수신 동의를 포함합니다.</p>
              </label>
            </div>
            <div className="terms-item">
              <input type="checkbox" id="agree-1" />
              <label htmlFor="agree-1">(필수) 개인회원 약관에 동의</label>
            </div>
            <div className="terms-item">
              <input type="checkbox" id="agree-2" />
              <label htmlFor="agree-2">(필수) 개인정보 수집 및 이용에 동의</label>
            </div>
            <div className="terms-item">
              <input type="checkbox" id="agree-3" />
              <label htmlFor="agree-3">(선택) 마케팅 정보 수신 동의</label>
            </div>
          </div>
        </div>

        {/* 회원가입 버튼 */}
        <button type="submit" className="signup-btn">
          회원가입 완료
        </button>
      </form>
    </div>
  );
}

export default SignUpStep2;
