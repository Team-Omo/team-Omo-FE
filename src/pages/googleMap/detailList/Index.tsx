import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  BookmarkLocationType,
  SelectedPlaceType,
} from '../../../model/interface';
import { HiLocationMarker } from 'react-icons/hi';
import ContentsSection from './ContentsSection';
import useGetLocationPostsQuery from '../../../hooks/reactQuery/map/useGetLocationPostsQuery';
import BookMarkButton from '../../../components/button/BookMarkButton';
import { detailSearchFields } from '../../../utils/googleSearch.ts/detailSearch';
import useMapStore from '../../../store/location/googleMapStore';
import ClockIcon from '../../../assets/icons/ClockIcon';
import DividingPointIcon from '../../../assets/icons/DividingPointIcon';
import DownArrow from '../../../assets/icons/DownArrow';
import PhoneIcon from '../../../assets/icons/PhoneIcon';
import { MoonLoader } from 'react-spinners';
import useGetBookmarkQuery from '../../../hooks/reactQuery/bookmark/useGetBookmarkQuery';
import usePostBookmarkMutation from '../../../hooks/reactQuery/bookmark/usePostBookmarkMutation';
import useDeleteBookmarkMutation from '../../../hooks/reactQuery/bookmark/useDeleteBookmarkMutation';
import toast from 'react-hot-toast';

interface Props {
  selectedPlace: SelectedPlaceType | null;
}

const DetailList: React.FC<Props> = ({ selectedPlace }) => {
  const { locationId, latitude, longitude } = selectedPlace || {};
  const { map } = useMapStore();
  const [googleSearchResult, setGoogleSearchResult] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const userId = sessionStorage.getItem('userId');

  const {
    data,
    refetch: getBookmarkRefetch,
    isLoading: getBookmarkLoading,
    isFetching: getBookmarkFetching,
  } = useGetBookmarkQuery(userId);

  const { postBookmarkingMutate } = usePostBookmarkMutation(locationId);
  const { deletebookmarkingMutate } = useDeleteBookmarkMutation(locationId);

  const { data: posts, refetch } = useGetLocationPostsQuery(
    locationId,
    latitude,
    longitude,
  );

  const activateBookmarkHandler = () => {
    if (getBookmarkFetching || getBookmarkLoading) return;
    if (!userId)
      return toast.error('로그인 후 이용해주세요.', {
        position: 'bottom-right',
        duration: 4000,
      });
    postBookmarkingMutate({ locationId });
  };

  const deActivateBookmarkHandler = () => {
    if (getBookmarkFetching || getBookmarkLoading) return;
    if (!userId)
      return toast.error('로그인 후 이용해주세요.', {
        position: 'bottom-right',
        duration: 4000,
      });
    deletebookmarkingMutate({ locationId });
  };

  const detailToggleHandler = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    userId && getBookmarkRefetch();
  }, [userId]);

  useEffect(() => {
    if (!locationId) return;
    refetch();
  }, [selectedPlace, refetch, locationId]);

  useEffect(() => {
    setIsLoading(true);
    if (!posts) return;
    if (posts.location.placeInfoId === 'null')
      return setGoogleSearchResult(null);

    const request = {
      placeId: posts?.location.placeInfoId,
      fields: detailSearchFields,
    };

    // @ts-ignore
    const service = new google.maps.places.PlacesService(map);
    service.getDetails(request, callback);

    function callback(
      place: google.maps.places.PlaceResult | null,
      status: google.maps.places.PlacesServiceStatus,
    ) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        setGoogleSearchResult(place);
        setIsLoading(false);
      } else {
        setGoogleSearchResult(null);
        setIsLoading(false);
      }
    }
  }, [posts]);

  return (
    <Base>
      <BodyContainer>
        {isLoading ? (
          <LoadingContainer>
            <MoonLoader color="#F97393" size={30} />
          </LoadingContainer>
        ) : (
          <ImageHeader
            $imageURL={
              googleSearchResult?.photos?.[0]?.getUrl()
                ? googleSearchResult?.photos?.[0]?.getUrl()
                : posts?.location.Posts[0].imgUrl
            }
          />
        )}

        <PlaceName>{posts?.location.storeName}</PlaceName>
        <Address>
          <HiLocationMarker />
          {posts?.location.address}
        </Address>

        <InfoContainer onClick={detailToggleHandler}>
          <ClockIcon />
          <span>
            {googleSearchResult?.opening_hours?.isOpen ? '영업중' : '영업종료'}
          </span>
          <DividingPointIcon />
          <span>영업시간</span>
          <DownArrow />
        </InfoContainer>
        {isOpen && googleSearchResult && (
          <WeekDayContainer>
            {googleSearchResult?.opening_hours?.weekday_text?.map((dayText) => (
              <BusinessContainer>
                <div>{dayText}</div>
              </BusinessContainer>
            ))}
          </WeekDayContainer>
        )}
        {isOpen && !googleSearchResult && (
          <WeekDayContainer>
            <BusinessContainer>영업 정보 없음</BusinessContainer>
          </WeekDayContainer>
        )}
        <InfoContainer>
          <PhoneIcon />
          <span>
            {googleSearchResult?.formatted_phone_number
              ? googleSearchResult?.formatted_phone_number
              : '전화번호 정보 없음'}
          </span>
        </InfoContainer>
        <BookMarContainer>
          <BookMarkButton
            activateBookmarkHandler={activateBookmarkHandler}
            deActivateBookmarkHandler={deActivateBookmarkHandler}
            getBookmarkLoading={getBookmarkLoading}
            getBookmarkFetching={getBookmarkFetching}
            data={data}
            locationId={locationId}
            position="map"
          />
        </BookMarContainer>
        <ContentsSection posts={posts} />
      </BodyContainer>
    </Base>
  );
};

export default DetailList;

const Base = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  width: 420px;
  height: calc(100vh - 60px);

  background-color: ${({ theme }) => theme.color.cardBg};
  border-right: 1px solid ${({ theme }) => theme.color.border2};
  z-index: 4;
  overflow-y: scroll;
  transition: all 600ms ease;
  overflow-x: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 15px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color.border2};
    border-radius: 20px;
    border: 5px solid ${({ theme }) => theme.color.cardBg};
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const ImageHeader = styled.div<{ $imageURL: string | undefined }>`
  width: 100%;
  height: 186px;

  background-image: ${({ $imageURL }) => `url(${$imageURL})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 186px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BodyContainer = styled.div`
  box-sizing: border-box;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

const PlaceName = styled.div`
  color: ${({ theme }) => theme.color.text};
  font-size: 20px;
  font-weight: 700;
  padding: 20px 20px 0 20px;
`;

const Address = styled.div`
  margin-top: 13px;
  color: #44a5ff;
  font-size: 16px;
  font-weight: 500;
  padding: 0 20px;
`;

const BookMarContainer = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
`;

const InfoContainer = styled.div`
  margin-left: 20px;
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 5px;
  color: ${({ theme }) => theme.color.sub};
  font-size: 16px;
  font-weight: 500;

  cursor: pointer;
  transition: color 300ms ease;
`;

const WeekDayContainer = styled.div`
  margin-top: 10px;
  margin-left: 23px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 10px;
`;

const BusinessContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.color.border};
`;
