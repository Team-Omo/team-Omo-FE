import React from 'react';
import styled from 'styled-components';

interface Props {
  userName: string;
  userProfileImg: string;
}

const ProfileHeader = (userProps: Props) => {
  const { userName, userProfileImg } = userProps;

  return (
    <Base>
      <ImgContainer src={userProfileImg} />
      <NameContainer>{userName}</NameContainer>
    </Base>
  );
};

export default ProfileHeader;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

const ImgContainer = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const NameContainer = styled.div`
  margin-top: 10px;
  font-size: 15px;
  font-weight: 600;
`;
