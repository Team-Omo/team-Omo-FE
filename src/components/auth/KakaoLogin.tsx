import React from 'react';
import styled from 'styled-components';


const KakaoLogin: React.FC = () => {
  
  const loginWithKakao = () => {
    window.location.href = `${import.meta.env.VITE_APP_SERVER_AUTH_URL}/kakao`;
  };

  return (
    <>
      <LargeBtn
        onClick={loginWithKakao}
        $bgColor="#FEE500"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ margin: '13px 0' }}>{kakao}</div>
        <Text style={{ marginLeft: '4px', textAlign: 'center' }} $color="#000">
          카카오로 로그인
        </Text>
      </LargeBtn>
    </>
  );
};

export default KakaoLogin;

const LargeBtn = styled.button<{ $bgColor: string }>`
  width: 400px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 4px;
  background: ${({ $bgColor }) => $bgColor || '#f97393'};
  border: none;
  margin: 0 0 12px 0;
  cursor: pointer;
`;

const Text = styled.div<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: ${({ $color }) => $color || '#fff'};
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  height: 25px;
`;

const kakao = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M12.0009 3C17.7999 3 22.501 6.66445 22.501 11.1847C22.501 15.705 17.7999 19.3694 12.0009 19.3694C11.4127 19.3694 10.8361 19.331 10.2742 19.2586L5.86611 22.1419C5.36471 22.4073 5.18769 22.3778 5.39411 21.7289L6.28571 18.0513C3.40572 16.5919 1.50098 14.0619 1.50098 11.1847C1.50098 6.66445 6.20194 3 12.0009 3Z"
      fill="black"
    />
  </svg>
);
