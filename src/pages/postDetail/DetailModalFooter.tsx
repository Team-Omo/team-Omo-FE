import React, { useEffect } from 'react';
import styled from 'styled-components';
import LikeButton from '../../components/button/LikeButton';
import MessageIcon from '../../assets/icons/MessageIcon';
import useGetLikeQuery from '../../hooks/reactQuery/like/useGetLikeQuery';
import usePostLikeMutation from '../../hooks/reactQuery/like/usePostLikeMutation';
import useDeleteLikeMutation from '../../hooks/reactQuery/like/useDeleteLikeMutation';
import toast from 'react-hot-toast';

interface Props {
  likeCount: number;
  postId: number | undefined;
  commentLength: number;
  footerRef: React.RefObject<HTMLDivElement>;
}

const DetailModalFooter: React.FC<Props> = ({
  likeCount,
  postId,
  commentLength,
  footerRef,
}) => {
  const userId = window.sessionStorage.getItem('userId');

  const { data, refetch, isLoading } = useGetLikeQuery();

  const { postMutate, isPostLoading } = usePostLikeMutation(postId);
  const { deleteMutate, isDeleteLoading } = useDeleteLikeMutation(postId);

  useEffect(() => {
    userId && refetch();
  }, [userId, refetch]);

  const activateLikeHandler = (
    setState: React.Dispatch<React.SetStateAction<boolean | undefined>>,
  ) => {
    if (!userId)
      return toast.error('로그인 후 이용해주세요.', {
        position: 'bottom-right',
        duration: 4000,
      });
    if (isPostLoading || isDeleteLoading) {
      return;
    }
    postMutate({ postId });
    setState(true);
  };

  const deActivateLikeHandler = (
    setState: React.Dispatch<React.SetStateAction<boolean | undefined>>,
  ) => {
    if (!userId)
      return toast.error('로그인 후 이용해주세요.', {
        position: 'bottom-right',
        duration: 4000,
      });
    if (isPostLoading || isDeleteLoading) {
      return;
    }
    deleteMutate({ postId });
    setState(false);
  };

  return (
    <Footer ref={footerRef}>
      <FooterItem $color="red">
        <LikeButton
          activateLikeHandler={activateLikeHandler}
          deActivateLikeHandler={deActivateLikeHandler}
          isLoading={isLoading}
          data={data}
          postId={postId}
        />
        <span>{likeCount}</span>
      </FooterItem>
      <FooterItem $color="blue">
        <MessageIcon />
        <span>{commentLength}</span>
      </FooterItem>
    </Footer>
  );
};

export default DetailModalFooter;

const Footer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 21px;
  gap: 10px;
  width: 100%;
`;

const FooterItem = styled.div<{ $color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  $color: #a9a9a9;
  svg {
    font-size: 24px;
    $color: ${({ $color }) => ($color === 'red' ? '#F97393' : '#44A5FF')};
  }
  span {
    margin-top: 4px;
    font-size: 20px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.sub2};
  }
`;
