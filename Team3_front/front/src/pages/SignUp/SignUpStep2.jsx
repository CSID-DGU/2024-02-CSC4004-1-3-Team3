import React, { useState } from 'react';
import './SignUp.css';

function SignUpStep2() {
  const [formData, setFormData] = useState({
    userName: '',
    loginId: '',
    loginPassword: '',
    userEmail: '',
    isAuthor: false, // API에서 요구하는 필드만 사용
  });

  const [agreeTerms1, setAgreeTerms1] = useState(false);
  const [agreeTerms2, setAgreeTerms2] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  const [agreeAll, setAgreeAll] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    // 필수 약관 동의 여부 확인
    if (!agreeTerms1 || !agreeTerms2) {
      alert('필수 약관에 동의해야 합니다.');
      return;
    }

    // 비어 있는 필드 확인
    if (
      !formData.userName.trim() ||
      !formData.loginId.trim() ||
      !formData.loginPassword.trim() ||
      !formData.userEmail.trim()
    ) {
      alert('모든 필드를 입력해야 합니다.');
      return;
    }

    try {
      console.log('요청 데이터:', formData);

      // API 요청
      const response = await fetch(
        'https://port-0-opensw-m3e7ph25a50cae42.sel4.cloudtype.app/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      console.log('서버 응답 데이터:', data);
      console.log('응답 상태 코드:', response.status);
      console.log('응답 데이터:', data);
      console.log('전송 데이터:', formData);
      console.log('에러 내용:', data.error);

      if (response.ok && data.success) {
        alert('회원가입 성공: ' + data.message);
        // 성공 시 폼 초기화
        setFormData({
          userName: '',
          loginId: '',
          loginPassword: '',
          userEmail: '',
          isAuthor: false,
        });
        setAgreeAll(false);
        setAgreeTerms1(false);
        setAgreeTerms2(false);
        setAgreeMarketing(false);
      } else {
        alert('회원가입 실패: ' + (data.msg || '알 수 없는 오류가 발생했습니다.'));
      }
    } catch (error) {
      console.error('회원가입 요청 중 오류 발생:', error);
      alert('회원가입 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

  // 약관 체크박스 상태 변경
  const handleCheckboxChange = e => {
    const { name, checked } = e.target;

    if (name === 'agreeAll') {
      setAgreeAll(checked);
      setAgreeTerms1(checked);
      setAgreeTerms2(checked);
      setAgreeMarketing(checked);
    } else if (name === 'agreeTerms1') {
      setAgreeTerms1(checked);
      setAgreeAll(checked && agreeTerms2 && agreeMarketing);
    } else if (name === 'agreeTerms2') {
      setAgreeTerms2(checked);
      setAgreeAll(agreeTerms1 && checked && agreeMarketing);
    } else if (name === 'agreeMarketing') {
      setAgreeMarketing(checked);
      setAgreeAll(agreeTerms1 && agreeTerms2 && checked);
    }
  };

  // 회원 유형 변경
  const handleMemberTypeChange = isAuthor => {
    setFormData(prevData => ({
      ...prevData,
      isAuthor, // 예술가 회원(true) 또는 개인 회원(false)
    }));
  };

  // 제출 버튼 비활성화 조건
  const isSubmitDisabled = !agreeTerms1 || !agreeTerms2;

  return (
    <div className="signup-page">
      <h2 className="signup-title">{formData.isAuthor ? '예술가 회원 가입' : '개인회원 가입'}</h2>
      <div className="signup-tabs">
        <button
          className={`tab ${!formData.isAuthor ? 'active' : ''}`}
          onClick={() => handleMemberTypeChange(false)}
        >
          개인 회원
        </button>
        <button
          className={`tab ${formData.isAuthor ? 'active' : ''}`}
          onClick={() => handleMemberTypeChange(true)}
        >
          예술가 회원
        </button>
      </div>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label>
          이름
          <input
            type="text"
            name="userName"
            placeholder="이름을 입력하세요"
            value={formData.userName}
            onChange={e => setFormData({ ...formData, userName: e.target.value })}
          />
        </label>
        <label>
          아이디
          <input
            type="text"
            name="loginId"
            placeholder="4-20자리 / 영문, 숫자 사용 가능"
            value={formData.loginId}
            onChange={e => setFormData({ ...formData, loginId: e.target.value })}
          />
        </label>
        <label>
          비밀번호
          <input
            type="password"
            name="loginPassword"
            placeholder="8-16자리 / 영문, 숫자, 특수문자 조합"
            value={formData.loginPassword}
            onChange={e => setFormData({ ...formData, loginPassword: e.target.value })}
          />
        </label>
        <label>
          이메일
          <input
            type="email"
            name="userEmail"
            placeholder="email@example.com"
            value={formData.userEmail}
            onChange={e => setFormData({ ...formData, userEmail: e.target.value })}
          />
        </label>
        <div className="terms-container">
          <div className="terms-item">
            <input
              type="checkbox"
              name="agreeAll"
              checked={agreeAll}
              onChange={handleCheckboxChange}
            />
            <label>전체 동의</label>
          </div>
          <div className="terms-item">
            <input
              type="checkbox"
              name="agreeTerms1"
              checked={agreeTerms1}
              onChange={handleCheckboxChange}
            />
            <label>(필수) 개인회원 약관에 동의</label>
          </div>
          <div className="terms-item">
            <input
              type="checkbox"
              name="agreeTerms2"
              checked={agreeTerms2}
              onChange={handleCheckboxChange}
            />
            <label>(필수) 개인정보 수집 및 이용에 동의</label>
          </div>
          <div className="terms-item">
            <input
              type="checkbox"
              name="agreeMarketing"
              checked={agreeMarketing}
              onChange={handleCheckboxChange}
            />
            <label>(선택) 마케팅 정보 수신 동의</label>
          </div>
        </div>
        <button type="submit" className="signup-btn" disabled={isSubmitDisabled}>
          회원가입 완료
        </button>
      </form>
    </div>
  );
}

export default SignUpStep2;
