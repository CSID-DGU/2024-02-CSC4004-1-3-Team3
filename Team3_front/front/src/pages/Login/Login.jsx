import React, { useState } from 'react';
import Login_modal from './Login_modal';

function Login() {
  const [isLoginModalOpen, setLoginModalOpen] = useState(true); // 항상 모달이 열리도록 설정

  const closeModal = () => {
    setLoginModalOpen(false); // 모달 닫기
    window.history.back(); // 모달 닫을 때 이전 페이지로 이동
  };

  return (
    <div>{isLoginModalOpen && <Login_modal isOpen={isLoginModalOpen} onClose={closeModal} />} </div>
  );
}

export default Login;
