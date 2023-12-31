import React from 'react';
import styled from 'styled-components';
import { RepleType } from '../../model/interface';
import Dropdown from '../comment/Dropdown';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

//TODO 유저 데이터
const RepleItem: React.FC<{
  reple: RepleType;
  postId: number;
  commentId: number;
}> = ({ reple, postId, commentId }) => {
  const { User, createdAt, content, replyId } = reple;
  const navigate = useNavigate();
  const currentUserId = Number(window.sessionStorage.getItem('userId'));

  // 이거 총 4개의 컴포넌트에서 쓰이기 때문에, hook으로 만들어서 사용 가능할 듯
  const onClickMoveUserPage = () => {
    const checkUserId = sessionStorage.getItem('userId');
    !checkUserId
      ? toast.error('로그인 후 이용해주세요.', {
          position: 'bottom-right',
          duration: 4000,
        })
      : navigate(`/userpage/${User.nickname}`);
  };

  return (
    <Base>
      <UserProfile $imgUrl={User.imgUrl} onClick={onClickMoveUserPage} />
      <BodyContainer>
        <UserInfoContainer>
          <UserName onClick={onClickMoveUserPage}>{User.nickname}</UserName>
          <CreateAt>{createdAt.split('T')[0]}</CreateAt>
          {User.userId === currentUserId && (
            <Dropdown
              commentId={commentId}
              replyId={replyId}
              contentId={postId}
            />
          )}
        </UserInfoContainer>
        <CommentText>{content}</CommentText>
      </BodyContainer>
    </Base>
  );
};

export default RepleItem;

const Base = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  &:first-child {
    margin-top: 20px;
  }
`;

const UserProfile = styled.div<{ $imgUrl: string }>`
  background-image: ${({ $imgUrl }) => `url('${$imgUrl}')`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 50px;
  height: 50px;
  border: 2px solid ${({ theme }) => theme.color.border};
  border-radius: 100%;
  cursor: pointer;
`;

const BodyContainer = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 9px;
  width: 90%;
`;

const UserInfoContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 16px;
  gap: 6px;
`;

const UserName = styled.div`
  color: ${({ theme }) => theme.color.text};
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
`;

const CreateAt = styled.div`
  color: ${({ theme }) => theme.color.sub};
  font-size: 16px;
  font-weight: 500;
`;

const CommentText = styled.div`
  color: ${({ theme }) => theme.color.text};
  font-size: 16px;
  font-weight: 500;
  line-height: 155%; /* 24.8px */
  letter-spacing: -0.16px;
  outline: none;
  border: none;
  height: 18px;
`;
