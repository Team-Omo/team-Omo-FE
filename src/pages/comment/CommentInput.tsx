import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { getToday } from '../../utils/getToday';
import usePostCommentMutation from '../../hooks/reactQuery/comment/usePostCommentMutation';
import CommentTextArea from '../../components/textarea/CommentTextArea';
import useInput from '../../hooks/useInput';
import { validateComments } from '../../utils/validationComments';
import FillButton from '../../components/button/FillButton';

interface Props {
  contentId: number | undefined;
}

const CommentInput: React.FC<Props> = ({ contentId }) => {
  const { value: text, changeValueHandler, clearValueHandler } = useInput();
  const [isTextareaFocus, setIsTextareaFoucs] = useState<boolean>(false);

  const userId = sessionStorage.getItem('userId');

  const onTextAreaFocus = useCallback(() => {
    setIsTextareaFoucs(true);
  }, []);

  const offTextAreaFocus = useCallback(() => {
    setIsTextareaFoucs(false);
  }, []);

  const { postMutate, isPostLoading } = usePostCommentMutation({
    contentId,
  });

  const postCommentHandler = () => {
    if (!validateComments(text)) return;
    const newComment = {
      PostId: contentId,
      UserId: userId,
      content: text,
      createdAt: getToday(),
    };
    postMutate({ contentId, newComment });
    clearValueHandler();
  };

  return (
    <Base>
      <CommentTextArea
        placeholder="여기에 댓글을 입력해주세요."
        value={text}
        onChange={(e) => changeValueHandler(e)}
        onFocus={onTextAreaFocus}
        onBlur={offTextAreaFocus}
        isTextareaFocus={isTextareaFocus}
      />
      <FillButton color="gray" onClick={postCommentHandler} size="md">
        댓글등록
      </FillButton>
    </Base>
  );
};

export default CommentInput;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;

  width: 100%;

  margin-top: 20px;
  margin-bottom: 40px;
`;
