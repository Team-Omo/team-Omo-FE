import React, { useId, useState } from 'react';
import styled from 'styled-components';
import Button from '../share/Button';
import useInput from '../../hooks/useInput';
import { getToday } from '../../function/getToday';
import { useMutation } from 'react-query';
import { postComment } from '../../apis/apis';

const CommentInput = () => {
  const [text, setText] = useState<string>('');
  const uniqueId = useId();
  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const { mutate, isLoading, isError, error, isSuccess } =
    useMutation(postComment);

  const postCommentHandler = () => {
    const newComment = {
      commentId: uniqueId,
      userName: '철', // TODO 유저와 연결
      text: text,
      createdAt: getToday(),
      updatedAt: getToday(),
    };
    mutate(newComment);
    setText('');
  };

  return (
    <Base>
      <TextArea
        placeholder="여기에 댓글을 입력해주세요."
        value={text}
        onChange={(e) => onChangeText(e)}
      />
      <Button theme="gray" padding="9px 14px" onClick={postCommentHandler}>
        댓글등록
      </Button>
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
`;

const TextArea = styled.textarea`
  width: calc(100% - 40px);
  height: 90px;
  resize: none;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  margin-bottom: 10px;
  padding: 20px;
  &::placeholder {
    color: #a5a5a5;
    font-size: 14px;
    font-weight: 700;
  }
  outline: none;
`;
