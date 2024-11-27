import React, { useState } from 'react';
import './SignUp.css';

function SignUpStep2() {
  const [isPersonalMember, setIsPersonalMember] = useState(true);
  const [formData, setFormData] = useState({
    userName: '',
    loginId: '',
    loginPassword: '',
    userEmail: '',
    isAuthor: false,
  });

  // 회원가입 버튼 클릭 시 호출되는 함수
  const handleSubmit = async e => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    try {
      const response = await fetch(
        'https://port-0-opensw-m3e7ph25a50cae42.sel4.cloudtype.app/signup',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData), // 요청 데이터를 JSON 형식으로 변환
        }
      );

      const data = await response.json(); // 응답 데이터 파싱

      if (response.ok) {
        alert('회원가입 성공: ' + data.message);
      } else {
        alert('회원가입 실패: ' + data.msg);
      }
    } catch (error) {
      console.error('회원가입 요청 중 오류 발생:', error);
      alert('회원가입 중 문제가 발생했습니다.');
    }
  };

  // 입력 필드 값 변경 시 호출되는 함수
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'isAuthor' ? e.target.checked : value,
    });
  };

  return (
    <div className="signup-page">
      <h2>{isPersonalMember ? '개인회원 가입' : '예술가 회원 가입'}</h2>
      <div className="signup-tabs">
        <button
          className={`tab ${isPersonalMember ? 'active' : ''}`}
          onClick={() => setIsPersonalMember(true)}
        >
          개인 회원
        </button>
        <button
          className={`tab ${!isPersonalMember ? 'active' : ''}`}
          onClick={() => setIsPersonalMember(false)}
        >
          예술가 회원
        </button>
      </div>

      <form className="signup-form" onSubmit={handleSubmit}>
        <label>
          아이디
          <input
            type="text"
            name="userName"
            placeholder="4-20자리 / 영문, 숫자 사용 가능"
            value={formData.userName}
            onChange={handleChange}
          />
        </label>
        <label>
          비밀번호
          <input
            type="password"
            name="loginPassword"
            placeholder="8-16자리 / 영문, 숫자, 특수문자 조합"
            value={formData.loginPassword}
            onChange={handleChange}
          />
        </label>
        <label>
          이메일
          <input
            type="email"
            name="userEmail"
            placeholder="email@example.com"
            value={formData.userEmail}
            onChange={handleChange}
          />
        </label>
        <label>
          회원 유형
          <input
            type="checkbox"
            name="isAuthor"
            checked={formData.isAuthor}
            onChange={handleChange}
          />{' '}
          예술가 회원
        </label>

        <button type="submit" className="signup-btn">
          회원가입 완료
        </button>
      </form>
    </div>
  );
}

export default SignUpStep2;
