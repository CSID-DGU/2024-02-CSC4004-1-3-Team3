import React, { useState } from 'react';
import './Login_modal.css';

function App({ isOpen, onClose }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!username || !password) {
            alert('아이디와 비밀번호를 모두 입력해주세요.');
            return;
        }

        try {
            const response = await fetch('https://your-backend-url.com/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('로그인 성공!');
                localStorage.setItem('token', data.token); // 인증 토큰 저장 (예: JWT)
                onClose(); // 로그인 성공 시 모달 닫기
            } else {
                alert('로그인 실패: ' + data.message); // 백엔드에서 받은 오류 메시지
            }
        } catch (error) {
            console.error('로그인 요청 중 오류 발생:', error);
            alert('로그인 중 오류가 발생했습니다.');
        }
    };

    if (!isOpen) return null; // isOpen이 false이면 모달을 렌더링하지 않음

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="login-logo">
                    <h2>로그인</h2>
                </div>
                
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="아이디" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>
                
                <div className="form-group">
                    <input 
                        type="password" 
                        placeholder="비밀번호" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>

                <div className="button-group">
                    <button onClick={handleLogin}>로그인</button>
                    <button onClick={onClose}>취소</button>
                </div>

                <div
                    className="clickable-text"
                    onClick={() => window.location.href = 'https://example.com'}
                >
                   아직 회원이 아니신가요?
                </div>
            </div>
        </div>
    );
}

export default Login_modal;
