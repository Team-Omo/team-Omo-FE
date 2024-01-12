import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { LikePostsType } from '../../model/interface';
import LikeEmptyIcon from '../../assets/icons/LikeEmptyIcon';
import LikeFillIcon from '../../assets/icons/LikeFillIcon';

interface Props {
  activateLikeHandler?: (
    setState: React.Dispatch<React.SetStateAction<boolean | undefined>>,
  ) => void;
  deActivateLikeHandler?: (
    setState: React.Dispatch<React.SetStateAction<boolean | undefined>>,
  ) => void;
  isLoading?: boolean;
  data?: LikePostsType[];
  postId?: number | undefined;
}

const LikeButton: React.FC<Props> = ({
  activateLikeHandler,
  deActivateLikeHandler,
  isLoading,
  data,
  postId,
}) => {
  const [isLiked, setIsLiked] = useState<boolean | undefined>(false);

  const onLikeHandler = () => {
    activateLikeHandler && activateLikeHandler(setIsLiked);
    !activateLikeHandler && setIsLiked(true);
  };

  const onDisLikeHandler = () => {
    deActivateLikeHandler && deActivateLikeHandler(setIsLiked);
    !activateLikeHandler && setIsLiked(false);
  };

  useEffect(() => {
    if (!isLoading) {
      setIsLiked(data?.some((db: LikePostsType) => db.PostId === postId));
    }
  }, [data, isLoading, postId]);

  return (
    <LikeBtnWrapper>
      {isLiked ? (
        <MotionDiv
          onClick={onDisLikeHandler}
          whileTap={{ scale: 3 }}
          transition={{ duration: 0.5 }}
        >
          <LikeFillIcon />
        </MotionDiv>
      ) : (
        <MotionDiv
          onClick={onLikeHandler}
          whileTap={{ scale: 3 }}
          transition={{ duration: 0.5 }}
        >
          <LikeEmptyIcon />
        </MotionDiv>
      )}
    </LikeBtnWrapper>
  );
};

export default LikeButton;

const LikeBtnWrapper = styled.div`
  cursor: pointer;
`;

const MotionDiv = styled(motion.div)`
  margin-top: 4px;
  cursor: 'pointer';
`;
