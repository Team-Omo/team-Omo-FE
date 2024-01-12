import React from 'react';
import styled from 'styled-components';
import CommentItem from '../comment/CommentItem';
import CommentInput from '../comment/CommentInput';
import { CommentType } from '../../model/interface';

interface Props {
  postId: number;
  footerRef: React.RefObject<HTMLDivElement>;
  comments: CommentType[];
}

const Comment: React.FC<Props> = ({ postId, comments }) => {
  return (
    <Base>
      {comments.map((comment) => (
        <CommentItem
          key={comment.commentId}
          comment={comment}
          postId={postId}
        />
      ))}

      <CommentInput contentId={postId} />
    </Base>
  );
};

export default Comment;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 20px;
  width: 100%;
`;
