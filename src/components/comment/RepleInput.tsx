import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../share/Button';
import { getToday } from '../../function/getToday';
import AlertModal from '../Modal/AlertModal';
import useAlertModalCtr from '../../hooks/useAlertModalCtr';
import CommentSuccess from '../share/alert/CommentSuccess';
import CommentError from '../share/alert/CommentError';
import usePostRepleMutation from '../../hooks/reactQuery/replies/usePostRepleMutation';
import CommentTextArea from '../textarea/CommentTextArea';
import useInput from '../../hooks/useInput';
import toast from 'react-hot-toast';

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

  // TODO 토큰 문제
  const postCommentHandler = () => {
    const trimmedText = text.trim();
    if (!trimmedText) {
      return toast.error('댓글 내용을 입력해주세요!', {
        position: 'top-right',
        duration: 4000,
        style: { fontSize: '14px' },
      });
    }
    const newComment = {
      PostId: postId,
      UserId: 3, // TODO 유저와 연결
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
          <Button
            theme="gray"
            padding="9px 14px"
            width="50px"
            height="15px"
            fontSize="14px"
            disabled={isPostLoading}
            onClick={toggleRepleInputHandler}
          >
            취소
          </Button>
          <Button
            theme="blue"
            padding="9px 14px"
            width="50px"
            height="15px"
            fontSize="14px"
            onClick={postCommentHandler}
            disabled={isPostLoading}
          >
            댓글등록
          </Button>
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
