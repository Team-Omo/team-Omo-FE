import { motion, stagger, useAnimate, animate } from 'framer-motion';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import usePostBookmarkMutation from '../../hooks/reactQuery/bookmark/usePostBookmarkMutation';
import useDeleteBookmarkMutation from '../../hooks/reactQuery/bookmark/useDeleteBookmarkMutation';
import useGetBookmarkQuery from '../../hooks/reactQuery/bookmark/useGetBookmarkQuery';
import { BookmarkLocationType } from '../../model/interface';
import _ from 'lodash';
import toast from 'react-hot-toast';
import BookMarkIcon from '../../assets/icons/BookMarkIcon';

const randomNumberBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

type AnimationSequence = Parameters<typeof animate>[0];

interface Props {
  locationId: number | undefined;
  top?: string;
  left?: string;
  bottom?: string;
  right?: string;
}

const BookMarkButton: React.FC<Props> = ({
  locationId,
  top,
  left,
  bottom,
  right,
}) => {
  const [scope, animate] = useAnimate();
  const [isBookMarking, setIsBookMarking] = useState<boolean | undefined>(
    false,
  );
  const userId = sessionStorage.getItem('userId');

  const { data, refetch, isLoading, isFetching } = useGetBookmarkQuery();

  useEffect(() => {
    if (!isFetching && !isLoading) {
      setIsBookMarking(
        data?.some(
          (db: BookmarkLocationType) => db.Location.locationId === locationId,
        ),
      );
    }
  }, [data, isLoading, isFetching, locationId]);

  const { postBookmarkingMutate } = usePostBookmarkMutation(locationId);
  const { deletebookmarkingMutate } = useDeleteBookmarkMutation(locationId);

  const onButtonClick = _.throttle(() => {
    const sparkles = Array.from({ length: 30 });
    const sparklesAnimation: AnimationSequence = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        x: randomNumberBetween(-80, 50),
        y: randomNumberBetween(-80, 50),
        scale: randomNumberBetween(1.5, 2.5),
        opacity: 1,
      },
      {
        duration: 0.4,
        at: '<',
      },
    ]);

    const sparklesFadeOut: AnimationSequence = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        opacity: 0,
        scale: 0,
      },
      {
        duration: 0.3,
        at: '<',
      },
    ]);

    const sparklesReset: AnimationSequence = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        x: 0,
        y: 0,
      },
      {
        duration: 0.000001,
      },
    ]);
    if (!userId)
      return toast.error('로그인 후 이용해주세요.', {
        position: 'bottom-right',
        duration: 4000,
      });
    if (!isBookMarking) {
      animate([
        ...sparklesReset,
        ['.letter', { y: -32 }, { duration: 0.2, delay: stagger(0.05) }],
        ['button', { scale: 0.8 }, { duration: 0.1, at: '<' }],
        ['button', { scale: 1 }, { duration: 0.1 }],
        ...sparklesAnimation,
        ['.letter', { y: 0 }, { duration: 0.000002 }],
        ...sparklesFadeOut,
      ]);
      setIsBookMarking(true);
      postBookmarkingMutate({ locationId });
    } else {
      setIsBookMarking(false);
      deletebookmarkingMutate({ locationId });
    }
  }, 400);

  useEffect(() => {
    userId && refetch();
  }, [userId]);

  return (
    <Container
      ref={scope}
      $top={top}
      $left={left}
      $right={right}
      $bottom={bottom}
    >
      <Button
        onClick={onButtonClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        $isBookMarking={isBookMarking}
      >
        <BookMarkIcon />
        <span>{isBookMarking ? '취소' : '북마크'}</span>
      </Button>
      <StyledDiv aria-hidden>
        {Array.from({ length: 30 }).map((_, index) => (
          <Svg className={`sparkle-${index}`} key={index} viewBox="0 0 122 117">
            <Path d="M64.39,2,80.11,38.76,120,42.33a3.2,3.2,0,0,1,1.83,5.59h0L91.64,74.25l8.92,39a3.2,3.2,0,0,1-4.87,3.4L61.44,96.19,27.09,116.73a3.2,3.2,0,0,1-4.76-3.46h0l8.92-39L1.09,47.92A3.2,3.2,0,0,1,3,42.32l39.74-3.56L58.49,2a3.2,3.2,0,0,1,5.9,0Z" />
          </Svg>
        ))}
      </StyledDiv>
    </Container>
  );
};

export default BookMarkButton;

const Container = styled.div<{
  $top?: string;
  $bottom?: string;
  $right?: string;
  $left?: string;
}>`
  position: absolute;
  bottom: ${({ $bottom }) => ($bottom ? $bottom : null)};
  top: ${({ $top }) => ($top ? $top : null)};
  right: ${({ $right }) => ($right ? $right : null)};
  left: ${({ $left }) => ($left ? $left : null)};
`;

const Button = styled(motion.div)<{ $isBookMarking?: boolean }>`
  position: relative;
  display: inline-flex;
  padding: 10px 16px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: 80px;
  border-radius: 41px;
  border: ${({ $isBookMarking, theme }) =>
    $isBookMarking
      ? `1px solid ${theme.color.link}`
      : `1px solid ${theme.color.border}`};
  z-index: 99;
  span {
    color: ${({ $isBookMarking, theme }) =>
      $isBookMarking ? `${theme.color.link}` : ` ${theme.color.text}`};
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    transition: color 300ms ease;
  }
  svg {
    fill: ${({ $isBookMarking, theme }) =>
      $isBookMarking ? `${theme.color.link}` : null};
  }
  path {
    stroke: ${({ $isBookMarking, theme }) =>
      $isBookMarking ? `${theme.color.link}` : `${theme.color.text}`};
    transition: all 300ms ease;
  }
  background-color: ${({ theme }) => theme.color.cardBg};
  &:hover span {
    color: ${({ theme }) => theme.color.link};
  }
  &:hover path {
    stroke: ${({ theme }) => theme.color.link};
  }
  &:hover {
    border: ${({ theme }) => `1px solid ${theme.color.link}`};
  }
  cursor: pointer;
`;

const StyledDiv = styled.div`
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 1;
  display: block;
`;

const Svg = styled.svg`
  width: 6px;
  height: 6px;
  position: absolute;
  left: 50%;
  top: 50%;
  opacity: 0;
`;

const Path = styled.path`
  fill: ${({ theme }) => theme.color.link};
`;
