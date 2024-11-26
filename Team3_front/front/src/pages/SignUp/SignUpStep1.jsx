import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

function SignUpStep1() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal'); // 기본 활성화 탭

  const handleTabClick = tab => {
    setActiveTab(tab);
  };

  const goToStep2 = () => {
    navigate('/signup/step2'); // 두 번째 페이지로 이동
  };

  const goToLogin = () => {
    navigate('/login'); // 로그인 페이지로 이동
  };

  return (
    <div className="signup-page">
      <h2 className="signup-title">회원가입</h2>
      <div className="signup-tabs">
        <button
          className={`tab ${activeTab === 'personal' ? 'active' : ''}`}
          onClick={() => handleTabClick('personal')}
        >
          개인 회원
        </button>
        <button
          className={`tab ${activeTab === 'artist' ? 'active' : ''}`}
          onClick={() => handleTabClick('artist')}
        >
          예술가 회원
        </button>
      </div>
      <div className="signup-form">
        <button onClick={goToStep2} className="signup-btn">
          아이디 만들기
        </button>
      </div>
      <p className="login-link" onClick={goToLogin}>
        이미 계정이 있나요? <span>로그인</span>
      </p>
    </div>
  );
}

export default SignUpStep1;
