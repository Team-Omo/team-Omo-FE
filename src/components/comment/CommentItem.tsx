import React from 'react';
import { Comments } from '../../model/interface';
import styled from 'styled-components';
import { FaEllipsis } from 'react-icons/fa6';
import Dropdown from '../share/Dropdown';

//TODO 유저 데이터 및 컨텐츠 데이터 추가
const CommentItem: React.FC<{ comment: Comments }> = ({ comment }) => {
  const { userName, text, createdAt } = comment;

  return (
    <Base>
      <UserProfile />
      <BodyContainer>
        <UserInfoContainer>
          <UserName>{userName}</UserName>
          <CreateAt>{createdAt}</CreateAt>
          <EllipsisBtn>
            <Dropdown items={['수정하기', '삭제하기']} width="70px">
              <FaEllipsis />
            </Dropdown>
          </EllipsisBtn>
        </UserInfoContainer>
        <CommentText>{text}</CommentText>
      </BodyContainer>
    </Base>
  );
};

export default CommentItem;

const Base = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  &:first-child {
    margin-top: 20px;
  }
`;

const UserProfile = styled.div`
  width: 50px;
  height: 50px;
  background: #d9d9d9;
  border-radius: 100%;
`;

const BodyContainer = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 9px;
  width: 100%;
`;

const UserInfoContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 6px;
`;

const UserName = styled.div`
  color: #000;
  font-size: 16px;
  font-weight: 700;
`;

const CreateAt = styled.div`
  color: #a5a5a5;
  font-size: 16px;
  font-weight: 500;
`;

const CommentText = styled.div`
  color: #000;
  font-size: 16px;
  font-weight: 500;
  line-height: 155%; /* 24.8px */
  letter-spacing: -0.16px;
`;

const EllipsisBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  color: #a5a5a5;
  font-size: 25px;
`;
