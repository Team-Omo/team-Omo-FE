import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ContentCardSkeleton from '../components/share/ContentCardSkeleton';
import ContentCard from '../components/share/ContentCard';
import PlaceCardSkeleton from '../components/auth/mypage/PlaceCardSkeleton';
// import MapPlaceCard from '../components/map/VerticalBar/placeList/MapPlaceCard';
import PlaceCard from '../components/auth/mypage/PlaceCard';
// 임시 데이터 두 개
import useGetAllContentsQuery from '../hooks/reactQuery/post/useGetAllContentsQuery';
import useGetHotPlaceQuery from '../hooks/useGetHotPlaceQuery';

const Mypage = () => {
  const navigate = useNavigate();
  const [isSelect, setIsSelect] = useState('Bookmark');

  // const { data: userData, isLoading: userLoading } = useGetUserDataQuery();
  // 임시 GET 두 개
  const { data: placeData, isLoading: placesLoading } = useGetHotPlaceQuery();
  const { data: myContents, isLoading: contentsLoading } =
    useGetAllContentsQuery();

  console.log(placeData);

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
          <MyImg src="" alt=""></MyImg>
          <Nickname style={{ marginLeft: '22px' }}>오늘뭐하지</Nickname>
        </Profile>
        <Btn onClick={() => navigate('/mypage/edit')}>내 정보 수정</Btn>
      </Header>
      <Select>
        <Item
          onClick={onClickSelectBookmark}
          selected={isSelect === 'Bookmark'}
        >
          북마크 {}
        </Item>
        <Item
          onClick={onClickSelectContents}
          selected={isSelect === 'Contents'}
          style={{ marginLeft: '30px' }}
        >
          내 게시글 {}
        </Item>
      </Select>
      <Contents>
        {placesLoading && isSelect === 'Bookmark'
          ? Array.from({ length: 12 }).map((_, idx) => (
              <PlaceCardSkeleton key={idx} />
            ))
          : isSelect === 'Bookmark' &&
            markedPlaces?.map((placeData) => (
              <PlaceCard placeData={placeData} />
            ))}
        {contentsLoading && isSelect === 'Contents'
          ? Array.from({ length: 12 }).map((_, idx) => (
              <ContentCardSkeleton key={idx} />
            ))
          : isSelect === 'Contents' &&
            myContents?.map((contentData) => (
              <ContentCard contentData={contentData} />
            ))}
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

const Item = styled.div`
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
