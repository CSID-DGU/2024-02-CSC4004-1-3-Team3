import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login_modal.css';

function Login_modal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      alert('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      const response = await fetch(
        'https://port-0-opensw-m3e7ph25a50cae42.sel4.cloudtype.app/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            loginId: username,
            loginPassword: password,
          }),
        }
      );

      if (!response.ok) {
        const errorMessage = `HTTP 오류: ${response.status}`;
        console.error(errorMessage);
        alert(errorMessage);
        return;
      }

      const data = await response.json();
      console.log('API 응답 데이터:', data);

      if (data.success && data.responseDto?.id) {
        localStorage.setItem('userId', data.responseDto.id);
        localStorage.setItem('isAuthor', data.responseDto.author); // 로그인한 사용자의 author 상태 저장
        alert('로그인 성공!');
        onClose();
        navigate('/');
      } else {
        console.error('로그인 실패:', data);
        alert(`로그인 실패: ${data.error || '알 수 없는 오류'}`);
      }
    } catch (error) {
      console.error('로그인 요청 중 오류 발생:', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="login_modal-overlay" onClick={onClose}>
      <div className="login_modal-content" onClick={e => e.stopPropagation()}>
        <div className="login_login-logo">
          <h2>로그인</h2>
        </div>
        <div className="login_form-group">
          <input
            type="text"
            placeholder="아이디"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="login_form-group">
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="login_button-group">
          <button onClick={handleLogin}>로그인</button>
          <button onClick={onClose}>취소</button>
        </div>
        <div className="login_clickable-text" onClick={() => navigate('/signup')}>
          아직 회원이 아니신가요?
        </div>
      </div>
    </div>
  );
}

export default Login_modal;
