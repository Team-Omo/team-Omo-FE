import React from 'react';
import styled from 'styled-components';
import MapSearchInput from './MapSearchInput';
import MapPlaceHeader from './MapPlaceHeader';
import MapPlaceCard from './MapPlaceCard';
import { LocationType, MapLocationType } from '../../../../model/interface';
const categories = ['전체', '음식점', '카페', '기타'];

interface Props {
  placeDatas: LocationType[] | undefined;
  isListOpen: boolean;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  setSelectedPlace: React.Dispatch<React.SetStateAction<LocationType | null>>;
  setMapCenterLocation: React.Dispatch<React.SetStateAction<MapLocationType>>;
}

const MapPlaceList: React.FC<Props> = ({
  placeDatas,
  isListOpen,
  selectedCategory,
  setSelectedCategory,
  setSelectedPlace,
  setMapCenterLocation,
}) => {
  const cafeDb = placeDatas?.filter((place) => place.categoryName === '카페');
  const RestaurantDb = placeDatas?.filter(
    (place) => place.categoryName === '음식점',
  );
  const etcDb = placeDatas?.filter(
    (place) => place.categoryName !== '카페' && place.categoryName !== '음식점',
  );

  const changeCategory = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <Base>
      <MapSearchInput setMapCenterLocation={setMapCenterLocation} />
      <MapPlaceHeader />
      <PlaceCategoryContainer>
        {categories.map((cat) => (
          <PlaceCategoryBtn
            selected={selectedCategory === cat}
            onClick={() => changeCategory(cat)}
          >
            {cat}
          </PlaceCategoryBtn>
        ))}
      </PlaceCategoryContainer>
      <ContentsContainer>
        {selectedCategory === '전체'
          ? placeDatas?.map((placeDb) => (
              <MapPlaceCard
                placeDb={placeDb}
                setSelectedPlace={setSelectedPlace}
              />
            ))
          : selectedCategory === '카페'
          ? cafeDb?.map((placeDb) => (
              <MapPlaceCard
                placeDb={placeDb}
                setSelectedPlace={setSelectedPlace}
              />
            ))
          : selectedCategory === '음식점'
          ? RestaurantDb?.map((placeDb) => (
              <MapPlaceCard
                placeDb={placeDb}
                setSelectedPlace={setSelectedPlace}
              />
            ))
          : etcDb?.map((placeDb) => (
              <MapPlaceCard
                placeDb={placeDb}
                setSelectedPlace={setSelectedPlace}
              />
            ))}
      </ContentsContainer>
    </Base>
  );
};

export default MapPlaceList;

const Base = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  width: 420px;
  height: calc(100vh - 60px);

  position: absolute;
  top: 0;
  background-color: ${({ theme }) => theme.color.bg};
  z-index: 4;
  border-right: 1px solid ${({ theme }) => theme.color.border2};

  overflow-y: scroll;
`;

const PlaceCategoryContainer = styled.div`
  box-sizing: border-box;
  margin: 17px 20px;
  width: 90%;
  height: 40px;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 8px;
`;

const PlaceCategoryBtn = styled.div<{ selected: boolean }>`
  border-radius: 40px;
  border: ${({ selected, theme }) =>
    selected ? '1px solid #f97393;' : `1px solid ${theme.color.border2}`};
  color: #323232;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  padding: 10px 16px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  color: ${({ theme }) => theme.color.text};
  cursor: pointer;
  &:hover {
    border: 1px solid #f97393;
  }
`;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 7px;

  width: 100%;
  height: 100%;
`;
