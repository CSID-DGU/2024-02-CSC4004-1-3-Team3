import React, { useState } from 'react';
import Login_modal from './Login_modal';

function Login() {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setLoginModalOpen(true)}>로그인</button>
      <Login_modal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </div>
  );
}

export default Login;
