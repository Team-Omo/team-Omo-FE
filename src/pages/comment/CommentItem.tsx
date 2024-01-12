import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { CommentType } from '../../model/interface';
import Dropdown from './Dropdown';
import RepleItem from '../reple/RepleItem';
import RepleInput from '../reple/RepleInput';
import { useNavigate } from 'react-router-dom';

const CommentItem: React.FC<{
  comment: CommentType;
  postId: number;
}> = ({ comment, postId }) => {
  const { Replies, commentId, content, createdAt, User } = comment;

  const navigate = useNavigate();

  const [isShowReple, setIsShowReple] = useState(false);
  const [isShowRepleInput, setIsShowRepleInput] = useState(false);

  const currentUserId = Number(window.sessionStorage.getItem('userId'));

  const toggleRepleHandler = useCallback(() => {
    setIsShowReple(!isShowReple);
  }, [isShowReple]);

  const toggleRepleInputHandler = useCallback(() => {
    setIsShowRepleInput(!isShowRepleInput);
  }, [isShowRepleInput]);

  const getRepleHandler = () => {
    toggleRepleHandler();
  };

  const onClickMoveUserPage = () => {
    navigate(`/userpage/${User.nickname}`);
  };

  return (
    <Base>
      <UserProfile $profileImg={User.imgUrl} onClick={onClickMoveUserPage} />
      <BodyContainer>
        <UserInfoContainer>
          <UserName onClick={onClickMoveUserPage}>{User.nickname}</UserName>
          <CreateAt>{createdAt.split('T')[0]}</CreateAt>
          {currentUserId === User.userId && (
            <Dropdown commentId={commentId} contentId={postId} />
          )}
        </UserInfoContainer>
        <CommentText>{content}</CommentText>
        {Replies?.length !== 0 ? (
          <>
            {isShowReple ? (
              !isShowRepleInput && (
                <RepleBtn onClick={toggleRepleInputHandler}>답글 달기</RepleBtn>
              )
            ) : (
              <RepleBtn onClick={getRepleHandler}>
                <span>{Replies?.length}개의 답글 보기</span>
              </RepleBtn>
            )}

            {isShowReple && (
              <>
                {Replies?.map((reple) => (
                  <RepleItem
                    key={reple.replyId}
                    reple={reple}
                    postId={postId}
                    commentId={commentId}
                  />
                ))}
                <RepleBtn $marginLeft="60px" onClick={toggleRepleHandler}>
                  답글 숨기기
                </RepleBtn>
                {isShowRepleInput && (
                  <RepleInput
                    postId={postId}
                    commentId={commentId}
                    toggleRepleInputHandler={toggleRepleInputHandler}
                  />
                )}
              </>
            )}
          </>
        ) : (
          <>
            {isShowRepleInput ? (
              <RepleInput
                postId={postId}
                commentId={commentId}
                toggleRepleInputHandler={toggleRepleInputHandler}
              />
            ) : (
              <RepleBtn onClick={toggleRepleInputHandler}>답글 달기</RepleBtn>
            )}
          </>
        )}
      </BodyContainer>
    </Base>
  );
};

export default CommentItem;

const Base = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  width: 100%;
  &:first-child {
    margin-top: 20px;
  }
`;

const UserProfile = styled.div<{ $profileImg: string }>`
  background-image: ${({ $profileImg }) => `url(${$profileImg})`};
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
  display: flex;
  justify-content: start;
  align-items: start;
  color: ${({ theme }) => theme.color.text};
  font-size: 16px;
  font-weight: 500;
  line-height: 155%; /* 24.8px */
  letter-spacing: -0.16px;
  outline: none;
  border: none;
  height: auto;
  max-width: 550px;
  width: 550px;
  word-break: break-all;
`;

const RepleBtn = styled.div<{ $marginLeft?: string }>`
  margin-top: 8px;
  margin-left: ${({ $marginLeft }) => ($marginLeft ? $marginLeft : null)};
  color: ${({ theme }) => theme.color.sub2};
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.14px;
  &:hover {
    color: ${({ theme }) => theme.color.text};
    font-weight: 700;
  }
  cursor: pointer;
  transition: all 300ms ease;
`;
