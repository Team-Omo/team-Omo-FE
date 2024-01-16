import React from 'react';
import styled from 'styled-components';
import FillButton from '../button/FillButton';
import { IoIosSend } from 'react-icons/io';
import { RiUserFollowFill } from 'react-icons/ri';

const ProfileFooter = () => {
  return (
    <Base>
      <FillButton color="primary" size="sm" icon={<IoIosSend />}>
        <span>채팅</span>
      </FillButton>
      <FillButton color="primary" size="sm" icon={<RiUserFollowFill />}>
        <span>팔로우</span>
      </FillButton>
    </Base>
  );
};

export default ProfileFooter;

const Base = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-content: center;
  gap: 5px;

  width: 100%;
`;
