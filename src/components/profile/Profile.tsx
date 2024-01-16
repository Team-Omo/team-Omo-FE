import React from 'react';
import styled from 'styled-components';
import ProfileHeader from './ProfileHeader';
import ProfileBody from './ProfileBody';
import ProfileFooter from './ProfileFooter';

interface Props {
  userName: string;
  userProfileImg: string;
}

const Profile = (userProps: Props) => {
  const { userName, userProfileImg } = userProps;
  return (
    <Base>
      <ProfileHeader userName={userName} userProfileImg={userProfileImg} />
      <Hr />
      <ProfileBody />
      <ProfileFooter />
    </Base>
  );
};

export default Profile;

const Base = styled.div`
  position: absolute;
  top: 48px;

  padding: 15px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  width: 150px;
  height: 200px;

  border-radius: 20px;
  background-color: ${({ theme }) => theme.color.cardBg};
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  z-index: 999;
`;

const Hr = styled.hr`
  width: 100%;
  margin: 20px 0px;
  border: 0.5px solid ${({ theme }) => theme.color.border};
`;
