import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { HotPostsType } from '../../../../model/interface';
import LocationIcon from '../../../../assets/icons/LocationIcon';
import StarCount from '../../../../components/share/StarCount';
import ClockIcon from '../../../../assets/icons/ClockIcon';
import DividingPointIcon from '../../../../assets/icons/DividingPointIcon';
import DownArrow from '../../../../assets/icons/DownArrow';
import PhoneIcon from '../../../../assets/icons/PhoneIcon';
import BookMarkButton from '../../../../components/button/BookMarkButton';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import useMapStore from '../../../../store/location/googleMapStore';
import usePlaceStore from '../../../../store/location/placeStore';
import useGetBookmarkQuery from '../../../../hooks/reactQuery/bookmark/useGetBookmarkQuery';
import usePostBookmarkMutation from '../../../../hooks/reactQuery/bookmark/usePostBookmarkMutation';
import useDeleteBookmarkMutation from '../../../../hooks/reactQuery/bookmark/useDeleteBookmarkMutation';
import toast from 'react-hot-toast';
interface Props {
  googleSearchResult: google.maps.places.PlaceResult | null;
  post: HotPostsType;
}

const Info: React.FC<Props> = ({ googleSearchResult, post }) => {
  const { Category, Location } = post;
  const [isOpen, setIsOpen] = useState(false);
  const { selectedLocation, setCurrentLocation } = useMapStore();
  const { setPlace } = usePlaceStore();

  const userId = sessionStorage.getItem('userId');

  const {
    data,
    refetch: getBookmarkRefetch,
    isLoading: getBookmarkLoading,
    isFetching: getBookmarkFetching,
  } = useGetBookmarkQuery(userId);

  const { postBookmarkingMutate } = usePostBookmarkMutation(
    Location.locationId,
  );
  const { deletebookmarkingMutate } = useDeleteBookmarkMutation(
    Location.locationId,
  );

  const activateBookmarkHandler = () => {
    if (getBookmarkFetching || getBookmarkLoading) return;
    if (!userId)
      return toast.error('로그인 후 이용해주세요.', {
        position: 'bottom-right',
        duration: 4000,
      });
    postBookmarkingMutate({ locationId: Location.locationId });
  };

  const deActivateBookmarkHandler = () => {
    if (getBookmarkFetching || getBookmarkLoading) return;
    if (!userId)
      return toast.error('로그인 후 이용해주세요.', {
        position: 'bottom-right',
        duration: 4000,
      });
    deletebookmarkingMutate({ locationId: Location.locationId });
  };

  useEffect(() => {
    userId && getBookmarkRefetch();
  }, [userId]);

  const detailToggleHandler = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

  const moveMapHandler = () => {
    document.body.style.overflow = 'auto';
    setCurrentLocation(selectedLocation);
    setPlace({
      locationId: Location.locationId,
      latitude: Location.latitude,
      longitude: Location.longitude,
    });
    navigate('/map');
  };
  return (
    <Base>
      <Header>
        <PlaceNameContainer>{Location.storeName}</PlaceNameContainer>
        <CategoryName>{Category.categoryName}</CategoryName>
        <BookMarkButton
          activateBookmarkHandler={activateBookmarkHandler}
          deActivateBookmarkHandler={deActivateBookmarkHandler}
          getBookmarkLoading={getBookmarkLoading}
          getBookmarkFetching={getBookmarkFetching}
          data={data}
          locationId={Location.locationId}
          position="info"
        />
      </Header>
      <AddressNameContainer>
        <LocationIcon />
        {Location.address}
      </AddressNameContainer>
      <StarContainer>
        <StarCount count={Location.starAvg} />
      </StarContainer>
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
            <BusinessContainer key={dayText}>
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
        <MapBtnContainer onClick={moveMapHandler}>
          <span>지도로 보기</span>
          <HiArrowNarrowRight />
        </MapBtnContainer>
      </InfoContainer>
    </Base>
  );
};

export default Info;

const Base = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 100%;
  height: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: start;
  align-items: end;
  gap: 6px;
  width: 100%;
  position: relative;
`;

const PlaceNameContainer = styled.div`
  color: ${({ theme }) => theme.color.text};
  font-size: 24px;
  font-weight: 700;
`;

const CategoryName = styled.div`
  color: ${({ theme }) => theme.color.sub};
  font-size: 14px;
  font-weight: 500;
`;

const AddressNameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 10px;

  color: #44a5ff;
  font-size: 16px;
  font-weight: 500;
`;

const StarContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    color: ${({ theme }) => theme.color.text};
    text-align: center;
    font-size: 16px;
    font-weight: 700;
  }
  margin-bottom: 10px;
`;

const InfoContainer = styled.div`
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

const MapBtnContainer = styled.div`
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  span {
    color: #44a5ff;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    &:hover {
      color: #3765ff;
    }
  }
  svg {
    width: 18px;
    height: 18px;
    color: #44a5ff;
    margin-bottom: 2px;
    &:hover {
      color: #3765ff;
    }
  }
  cursor: pointer;
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
