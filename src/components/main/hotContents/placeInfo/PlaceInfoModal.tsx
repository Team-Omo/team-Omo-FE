import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { HotPostsType } from '../../../../model/interface';
import MiniMap from './MiniMap';
import Info from './Info';
import useMapStore from '../../../../store/location/googleMapStore';
import { detailSearchFields } from '../../../../function/googleSearch.ts/detailSearch';
import usePlaceStore from '../../../../store/location/placeStore';

interface Props {
  handleModalClose: (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>,
  ) => void;
  post: HotPostsType;
}

const PlaceInfoModal: React.FC<Props> = ({ handleModalClose, post }) => {
  const { Location } = post;
  const { map } = useMapStore();
  const { setPlace } = usePlaceStore();
  const [googleSearchResult, setGoogleSearchResult] =
    useState<google.maps.places.PlaceResult | null>(null);

  useEffect(() => {
    const request = {
      placeId: Location.placeInfoId,
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
        console.log(place);
        setGoogleSearchResult(place);
      }
    }
    setPlace({
      locationId: Location.locationId,
      latitude: Location.latitude,
      longitude: Location.longitude,
    });
  }, []);
  return (
    <Base>
      <MiniMap post={post} />
      <Info googleSearchResult={googleSearchResult} post={post} />
    </Base>
  );
};

export default PlaceInfoModal;

const Base = styled.div`
  width: 100%;
  height: 100%;

  background: ${({ theme }) => theme.color.bg};
  border-radius: 16px;
  display: flex;

  flex-direction: column;
  justify-content: start;
  align-content: center;
  padding: 45px;
`;