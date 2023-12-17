import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PlaceCommnetCard from './Card';
import PlaceCommnetCardSkeleton from './CardSkeleton';
import useGetCommentPostsQuery from '../../../hooks/reactQuery/main/useGetCommentPostsQuery';
import CardDarkSkeleton from './CardDarkSkeleton';

interface Props {
  currentLocation: string | undefined;
  themeMode: string | null;
}

const PlaceComments: React.FC<Props> = ({ currentLocation, themeMode }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const {
    data: comments,
    isLoading,
    refetch,
  } = useGetCommentPostsQuery(currentLocation);

  const repeatCounts = Array.from({ length: 9 }, (_, index) => index);

  const carouselCounts = Array.from(
    { length: repeatCounts.length / 3 },
    (_, index) => index,
  );

  const handleGoTo = (index: number) => setActiveIndex(index);

  const handleMouseEnter = () => setIsFocused(true);
  const handleMouseLeave = () => setIsFocused(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    const handleNext = () => {
      setActiveIndex(
        (activeIndex) => (activeIndex + 1) % carouselCounts.length,
      );
    };

    if (!isFocused) {
      intervalId = setInterval(handleNext, 4000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isFocused]);

  useEffect(() => {
    refetch();
  }, [currentLocation]);

  return (
    <Base onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Header>
        <Title>실시간 댓글 💬</Title>
      </Header>
      <Body>
        <CarouselList>
          {!isLoading
            ? comments?.map((comment) => (
                <CarouselItem activeIndex={activeIndex} key={comment.postId}>
                  <PlaceCommnetCard comment={comment} />
                </CarouselItem>
              ))
            : themeMode === 'LightMode'
            ? Array.from({ length: 9 }).map((_, i) => (
                <CarouselItem activeIndex={activeIndex} key={i}>
                  <PlaceCommnetCardSkeleton />
                </CarouselItem>
              ))
            : Array.from({ length: 9 }).map((_, i) => (
                <CarouselItem activeIndex={activeIndex} key={i}>
                  <CardDarkSkeleton />
                </CarouselItem>
              ))}
        </CarouselList>
      </Body>
      {repeatCounts.length && (
        <Nav>
          {carouselCounts.map((i) => (
            <NavItem key={i}>
              <NavButton
                isActive={activeIndex === i}
                onClick={() => handleGoTo(i)}
              />
            </NavItem>
          ))}
        </Nav>
      )}
    </Base>
  );
};

export default PlaceComments;

const Base = styled.div`
  box-sizing: border-box;
  margin: 60px 0 55px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  width: 100%;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.text};
`;

const Body = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;
`;

const CarouselList = styled.ul`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;
  list-style: none;

  padding: 0;
  display: flex;
  width: 1200px;
  overflow: hidden;
`;

const CarouselItem = styled.li<{ activeIndex: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(-${({ activeIndex }) => activeIndex * 315}%);
  transition: 500ms ease;
`;

const NavButton = styled.div<{ isActive?: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 100%;
  border: none;

  background: ${({ isActive }) => (isActive ? '#ED6653' : '#C6C8CA')};
`;

const NavItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nav = styled.ul`
  list-style: none;

  padding: 0;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  width: 100%;
  height: 30px;
`;
