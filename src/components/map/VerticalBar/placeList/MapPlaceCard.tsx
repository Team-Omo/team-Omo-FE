import React from 'react';
import { LocationType } from '../../../../model/interface';
import styled from 'styled-components';
import { LuBookmark } from 'react-icons/lu';
import { PiStarFill } from 'react-icons/pi';
import { MdLocationOn } from 'react-icons/md';

interface Props {
  placeDb: LocationType;
  setSelectedPlace: React.Dispatch<React.SetStateAction<LocationType | null>>;
}

const MapPlaceCard: React.FC<Props> = ({ placeDb, setSelectedPlace }) => {
  const { id, categoryName, storeName, address, star } = placeDb;

  const selectPlaceHandler = (place: LocationType) => {
    setSelectedPlace(place);
  };

  return (
    <>
      <Base onClick={() => selectPlaceHandler(placeDb)}>
        <ImageContainer />
        <HeaderContainer>
          <PlaceName>{storeName}</PlaceName>
          <CategoryName>{categoryName}</CategoryName>
          <BookMarkBtn>
            <LuBookmark />
          </BookMarkBtn>
        </HeaderContainer>
        <LocationName>
          <MdLocationOn />
          <span>{address}</span>
        </LocationName>
        <FoonterContainer>
          <RatingConatiner>
            <RatingBtnWrapper>
              <PiStarFill />
            </RatingBtnWrapper>
            <Title>별점</Title>
            <Count>{star}</Count>
            <Count>(203)</Count>
          </RatingConatiner>
          <ContentCountContainer>
            <Title>게시글</Title>
            <Count>34</Count>
          </ContentCountContainer>
        </FoonterContainer>
      </Base>
    </>
  );
};

export default MapPlaceCard;

const Base = styled.div`
  margin-top: 20px;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  width: 100%;
`;

const ImageContainer = styled.div<{ imageURL?: string[] }>`
  background: gray;
  width: 100%;
  height: 180px;
  border-radius: 8px;
`;

const HeaderContainer = styled.div`
  margin-top: 12px;

  display: flex;
  justify-content: start;
  align-items: end;
  gap: 4px;

  width: 100%;
`;

const PlaceName = styled.div`
  color: #212121;
  font-size: 20px;
  font-weight: 700;
`;

const CategoryName = styled.div`
  color: #5a5a5a;
  font-size: 14px;
  font-weight: 500;
`;

const BookMarkBtn = styled.div`
  margin-left: auto;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #a5a5a5;
`;

const LocationName = styled.div`
  margin-top: 10px;

  display: flex;
  justify-content: start;
  align-items: center;
  gap: 5px;

  color: #44a5ff;
  span {
    font-size: 16px;
    font-weight: 500;
  }
  svg {
    font-size: 22px;
  }
`;

const FoonterContainer = styled.div`
  margin-top: 15px;

  display: flex;
  justify-content: start;
  align-items: center;

  gap: 10px;

  width: 100%;
`;

const RatingConatiner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const RatingBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f97393;
  font-size: 20px;
`;

const ContentCountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const Title = styled.div`
  color: #5a5a5a;
  font-size: 16px;
  font-weight: 500;
`;

const Count = styled.div`
  color: #111;
  font-size: 16px;
  font-weight: 700;
`;
