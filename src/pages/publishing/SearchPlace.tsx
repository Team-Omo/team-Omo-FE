import React, { Dispatch, SetStateAction, useEffect } from 'react';
import styled from 'styled-components';
import { LuMapPin } from 'react-icons/lu';
import { IoClose } from 'react-icons/io5';
import { SelectedInfoType } from '../../model/interface';
import { FaLocationDot } from 'react-icons/fa6';
import useMapStore from '../../store/location/googleMapStore';
import { placeInfoCallback } from '../../utils/googleSearch.ts/textSearch';
import useInput from '../../hooks/useInput';
import { kakaoPlaceSearch } from '../../utils/kakoSearch';
import { scopeAreaToast } from '../../components/alert/placeAlert';

interface Props {
  selectedInfo: SelectedInfoType;
  setSelectedInfo: React.Dispatch<React.SetStateAction<SelectedInfoType>>;
  searchValue: kakao.maps.services.PlacesSearchResult;
  setSearchValue: React.Dispatch<
    SetStateAction<kakao.maps.services.PlacesSearchResult>
  >;
  googleSearchResult: google.maps.places.PlaceResult[] | null;
  setGoogleSearchResult: Dispatch<
    SetStateAction<google.maps.places.PlaceResult[] | null>
  >;
}

const SearchPlace: React.FC<Props> = ({
  selectedInfo,
  setSelectedInfo,
  searchValue,
  setSearchValue,
  setGoogleSearchResult,
}) => {
  const { map } = useMapStore();
  const { value, clearValueHandler, changeValueHandler } = useInput();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeValueHandler(e);
    kakaoPlaceSearch(e.target.value, setSearchValue);
  };

  const deleteInfoHandler = () => {
    setSelectedInfo({
      placeName: '',
      addressName: '',
      categoryName: '',
      latitude: '',
      longitude: '',
    });
    setSearchValue([]);
    clearValueHandler();
    setGoogleSearchResult(null);
  };

  const selectInfoHandler = (
    placeName: string,
    addressName: string,
    categoryName: string,
    latitude: string,
    longitude: string,
  ) => {
    if (!addressName.includes('서울')) {
      clearValueHandler();
      return scopeAreaToast();
    }
    const request = {
      query: placeName,
      fields: ['place_id', 'formatted_address', 'name'],
    };
    // @ts-ignore
    const service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, (result, status) => {
      placeInfoCallback(result, status, setGoogleSearchResult);
    });
    const filteredCategoryName =
      categoryName === '음식점' || categoryName === '카페'
        ? categoryName
        : '기타';
    setSelectedInfo({
      placeName: placeName,
      addressName: addressName,
      categoryName: filteredCategoryName,
      latitude: latitude,
      longitude: longitude,
    });
    clearValueHandler();
  };

  useEffect(() => {
    value === '' && setSearchValue([]);
  }, [value]);

  return (
    <Base>
      {!selectedInfo.placeName && (
        <SearchContainer>
          <FaLocationDot />
          <SearchInput
            value={value}
            placeholder="위치를 입력해 장소를 추가해보세요."
            onChange={(e) => onChangeHandler(e)}
          />
        </SearchContainer>
      )}

      {selectedInfo.placeName && (
        <PlaceContainer>
          <PlaceName>
            {selectedInfo.placeName}
            <DeleteBtn onClick={deleteInfoHandler}>
              <IoClose />
            </DeleteBtn>
          </PlaceName>
          <AdressName>
            <LuMapPin />
            {selectedInfo.addressName}
          </AdressName>
        </PlaceContainer>
      )}
      {value && (
        <ResultList>
          {searchValue.map((result) => (
            <ResultItemContainer
              onClick={() => {
                const address =
                  result.road_address_name === ''
                    ? result.address_name
                    : result.road_address_name;
                selectInfoHandler(
                  result.place_name,
                  address,
                  result.category_group_name,
                  result.y,
                  result.x,
                );
              }}
            >
              <ResultPlaceName>{result.place_name}</ResultPlaceName>
              <ResultAdress>
                {result.road_address_name === ''
                  ? result.address_name
                  : result.road_address_name}
              </ResultAdress>
            </ResultItemContainer>
          ))}
        </ResultList>
      )}
    </Base>
  );
};

export default SearchPlace;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  margin-top: 25px;
  width: 100%;
  gap: 5px;
  position: relative;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  svg {
    color: #a5a5a5;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 20px;
  outline: none;
  border: none;
  color: ${({ theme }) => theme.color.text};
  font-size: 16px;
  font-weight: 700;
  background-color: ${({ theme }) => theme.color.bg};
  &::placeholder {
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.color.sub};
  }
`;

const ResultList = styled.div`
  position: absolute;
  top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 100%;
  height: 200px;
  overflow: scroll;

  background: ${({ theme }) => theme.color.cardBg};
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  &::-webkit-scrollbar {
    width: 15px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color.border2};
    border-radius: 20px;
    border: 5px solid ${({ theme }) => theme.color.bg};
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-button:start:decrement,
  &::-webkit-scrollbar-button:end:increment {
    display: block;
    height: 8px;
    background-color: transparent;
  }
`;

const ResultItemContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
  gap: 5px;
  padding: 10px 20px 10px 20px;
  &:hover {
    background: ${({ theme }) => theme.color.hover};
  }
  cursor: pointer;
  &:first-child {
    padding: 20px 20px 10px 20px;
  }
`;

const ResultPlaceName = styled.div`
  color: ${({ theme }) => theme.color.text};
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 24px */
`;

const ResultAdress = styled.div`
  color: ${({ theme }) => theme.color.sub2};

  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
`;

const PlaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 13px;
  width: 100%;
`;

const PlaceName = styled.div`
  color: ${({ theme }) => theme.color.text};

  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 24px */

  display: flex;
  justify-content: start;
  align-items: center;
  gap: 9px;
  width: 100%;
`;
const AdressName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #44a5ff;

  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 16px */
`;

const DeleteBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  border: 1px solid #a5a5a5;
  font-size: 15px;
  padding: 1px;
  font-size: 16px;
  color: #a5a5a5;
  margin-bottom: 2px;
  cursor: pointer;
  &:hover {
    border: 1px solid #f97393;
    color: #f97393;
  }
`;
