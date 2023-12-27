import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ContentCardSkeleton from '../components/share/ContentCardSkeleton';
import ContentCard from '../components/share/ContentCard';
import PlaceCardSkeleton from '../components/auth/mypage/PlaceCardSkeleton';
import PlaceCard from '../components/auth/mypage/PlaceCard';
import useGetUserDataQuery from '../hooks/reactQuery/mypage/useGetUserDataQuery';
import useGetMyPostsQuery from '../hooks/reactQuery/mypage/useGetMyPostsQuery';
import useGetMyBookmarkQuery from '../hooks/reactQuery/mypage/useGetMyBookmarkQuery';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const Mypage: React.FC = () => {
  // 무한 스크롤 추가하기, 데이터 잘 처리하기
  const navigate = useNavigate();

  const [isSelect, setIsSelect] = useState('Bookmark');

  const { data: userData, isError: userError } = useGetUserDataQuery();
  const {
    data: myBookmark,
    fetchNextPage: fetchNextBookmark,
    hasNextPage: hasNextBookmark,
    isFetching: isFetchingBookmark,
    isFetchingNextPage: isFetchingNextBookmark,
    refetch: refetchBookmark,
  } = useGetMyBookmarkQuery();
  const {
    data: myPosts,
    fetchNextPage: fetchNextMyPosts,
    hasNextPage: hasNextMyPosts,
    isFetching: isFetchingMyPosts,
    isFetchingNextPage: isFetchingNextMyPosts,
    refetch: refetchMyPosts,
  } = useGetMyPostsQuery();

  const { setTarget: setTargetBookmark } = useIntersectionObserver({
    hasNextBookmark,
    fetchNextBookmark,
  });

  const { setTarget: setTargetMyPosts } = useIntersectionObserver({
    hasNextMyPosts,
    fetchNextMyPosts,
  });

  useEffect(() => {
    refetchBookmark();
    refetchMyPosts();
  }, [isSelect]);

  console.log('유저 데이터 -> ', userData);
  console.log('유저 데이터 에러 -> ', userError);
  console.log('내 북마크 -> ', myBookmark);
  console.log('내 게시글 -> ', myPosts);

  useEffect(() => {
    userError
      ? (alert('다시 로그인 후 이용해주세요.'),
        sessionStorage.removeItem('userId'),
        sessionStorage.removeItem('accessToken'),
        sessionStorage.removeItem('refreshToken'),
        navigate('/login'))
      : console.log(sessionStorage.getItem('userId'));
  }, []);

  const onClickSelectBookmark = () => {
    setIsSelect('Bookmark');
  };
  const onClickSelectContents = () => {
    setIsSelect('Contents');
  };

  return (
    <Base>
      <Header>
        <Profile>
          <MyImg src={userData?.data.imgUrl} alt=""></MyImg>
          <Nickname style={{ marginLeft: '22px' }}>
            {userData?.data.nickname}
          </Nickname>
        </Profile>
        <Btn onClick={() => navigate('/mypage/edit')}>내 정보 수정</Btn>
      </Header>
      <Select>
        <Item
          onClick={onClickSelectBookmark}
          selected={isSelect === 'Bookmark'}
        >
          북마크
        </Item>
        <Item
          onClick={onClickSelectContents}
          selected={isSelect === 'Contents'}
          style={{ marginLeft: '30px' }}
        >
          내 게시글
        </Item>
      </Select>
      <Contents>
        {isFetchingBookmark &&
        !isFetchingNextBookmark &&
        isSelect === 'Bookmark'
          ? Array.from({ length: 12 }).map((_, idx) => (
              <PlaceCardSkeleton key={idx} />
            ))
          : !isFetchingBookmark &&
            isFetchingNextBookmark &&
            isSelect === 'Bookmark' &&
            myBookmark?.map((placeData) => <PlaceCard placeData={placeData} />)}
        {isFetchingMyPosts && !isFetchingNextMyPosts && isSelect === 'Contents'
          ? Array.from({ length: 12 }).map((_, idx) => (
              <ContentCardSkeleton key={idx} />
            ))
          : !isFetchingMyPosts &&
            isFetchingNextMyPosts &&
            isSelect === 'Contents' &&
            myPosts?.map((contentData) => (
              <ContentCard contentData={contentData} />
            ))}
        {isSelect === 'Bookmark' ? (
          <ObserverContainer ref={setTargetBookmark}></ObserverContainer>
        ) : (
          <ObserverContainer ref={setTargetMyPosts}></ObserverContainer>
        )}
      </Contents>
    </Base>
  );
};

export default Mypage;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  min-height: calc(100vh - 60px);
  height: auto;
  background: ${({ theme }) => theme.color.bg};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1200px;
  height: 64px;
  margin: 54px 0 50px 0;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
`;

const MyImg = styled.img`
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  border-radius: 100%;
  border: none;
  /* background: url(<path-to-image>), lightgray 50% / cover no-repeat; */
`;

const Nickname = styled.div`
  color: var(--light-1_txt, #111);
  font-family: Wanted Sans;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  margin-left: 22px;
`;

const Btn = styled.button`
  display: inline-flex;
  padding: 10px 13px 8px 14px;
  border-radius: 8px;
  background: var(--link, #44a5ff);
  color: #fff;
  font-family: Wanted Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  border: none;
  cursor: pointer;
`;

const Select = styled.div`
  width: 1200px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Item = styled.div<{ selected: boolean }>`
  color: var(--light-1_txt, #111);
  font-family: Wanted Sans;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  padding: 5px;
  border: ${({ selected, theme }) =>
    selected ? `solid #f97393` : `solid ${theme.color.bg}`};
  border-width: 0 0 3px 0;
  margin-bottom: 16px;
  cursor: pointer;
`;

const Contents = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px 20px;
  margin: 20px 0px 40px 0;

  grid-area: main;
`;
const ObserverContainer = styled.div`
  height: 100px;
`;
