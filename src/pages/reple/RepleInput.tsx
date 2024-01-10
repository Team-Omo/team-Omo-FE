import React, { useState } from 'react';
import styled from 'styled-components';
import { getToday } from '../../utils/getToday';
import usePostRepleMutation from '../../hooks/reactQuery/replies/usePostRepleMutation';
import CommentTextArea from '../../components/textarea/CommentTextArea';
import useInput from '../../hooks/useInput';
import { validateComments } from '../../utils/validationComments';
import FillButton from '../../components/button/FillButton';

interface Props {
  postId: number | undefined;
  commentId: number | undefined;
  toggleRepleInputHandler: () => void;
}

const RepleInput: React.FC<Props> = ({
  postId,
  commentId,
  toggleRepleInputHandler,
}) => {
  const { value: text, changeValueHandler, clearValueHandler } = useInput();
  const [isTextareaFocus, setIsTextareaFoucs] = useState<boolean>(false);

  const currentUserId = Number(window.sessionStorage.getItem('userId'));

  const onTextAreaFocus = () => {
    setIsTextareaFoucs(true);
  };
  const offTextAreaFocus = () => {
    setIsTextareaFoucs(false);
  };
  const { postMutate, isPostLoading } = usePostRepleMutation({
    postId,
    commentId,
  });

  const postCommentHandler = () => {
    if (!validateComments(text)) return;
    const newComment = {
      PostId: postId,
      UserId: currentUserId,
      content: text,
      createdAt: getToday(),
    };
    postMutate({ postId, commentId, newComment });
    clearValueHandler();
  };

  return (
    <>
      <Base>
        <CommentTextArea
          placeholder="여기에 댓글을 입력해주세요."
          value={text}
          onChange={(e) => changeValueHandler(e)}
          onFocus={onTextAreaFocus}
          onBlur={offTextAreaFocus}
          isTextareaFocus={isTextareaFocus}
        />
        <ButtonConatiner>
          <FillButton onClick={toggleRepleInputHandler} size="sm" color="gray">
            취소
          </FillButton>
          <FillButton onClick={postCommentHandler} size="sm" color="blue">
            댓글등록
          </FillButton>
        </ButtonConatiner>
      </Base>
    </>
  );
};

export default RepleInput;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;

  width: 100%;

  margin-top: 20px;
`;

const ButtonConatiner = styled.div`
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;
