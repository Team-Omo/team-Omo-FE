import React from 'react';
import styled from 'styled-components';

const ProfileBody = () => {
  return (
    <Base>
      <span>2</span>
      <span>팔로워</span>
    </Base>
  );
};

export default ProfileBody;

const Base = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;

  span {
    font-size: 14px;
    color: ${({ theme }) => theme.color.sub2};
  }
`;
