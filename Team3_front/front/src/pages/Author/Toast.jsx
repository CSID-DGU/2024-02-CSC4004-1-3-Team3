import React, { useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    console.log('Toast is visible'); // Toast가 화면에 나타날 때 로그 출력

    const timer = setTimeout(() => {
      console.log('Toast is closing'); // 3초 후 로그 출력
      onClose(); // onClose 콜백 호출
    }, 3000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [onClose]); // onClose가 바뀌면 Effect 재실행

  return (
    <div className="toast">
      <span>{message}</span> {/* 전달된 메시지 표시 */}
    </div>
  );
};

export default Toast;
