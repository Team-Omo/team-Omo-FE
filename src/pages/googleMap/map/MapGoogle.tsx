import {
  GoogleMap,
  OverlayView,
  OverlayViewF,
  useJsApiLoader,
} from '@react-google-maps/api';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { BookmarkLocationType, LocationType } from '../../../model/interface';
import { darkMapTheme, lightMapTheme } from './maptheme';
import CurrentLocationMarker from '../../../components/marker/CurrentLocationMarker';
import LocationMarker from '../../../components/marker/LocationMarker';
import CurrentLocationButton from '../../../components/button/mapActionButton/CurrentLocationButton';
import LevelButton from '../../../components/button/mapActionButton/LevelButton';
import useMapStore from '../../../store/location/googleMapStore';
import useThemeStore from '../../../store/theme/themeStore';
import usePlaceStore from '../../../store/location/placeStore';
import BookMarkLocationButton from '../../../components/button/mapActionButton/BookMarkLocationButton';
import BookmarkLocationMarker from '../../../components/marker/BookmarkLocationMarker';
import useBookMarkPlaceStore from '../../../store/location/bookMarkPlaceStore';
import toast from 'react-hot-toast';
import { getCurrentCoords } from '../../../utils/kakao';

interface Props {
  placeDatas: LocationType[] | undefined;
  isListOpen: boolean;
  setIsListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  bookmarkPlaces: BookmarkLocationType[] | undefined;
}

const MapGoogle: React.FC<Props> = ({
  placeDatas,
  isListOpen,
  setIsListOpen,
  bookmarkPlaces,
}) => {
  const [mapLevel, setMapLevel] = useState(17);
  const { place } = usePlaceStore();
  const { map, setMap, currentLocation, setCurrentLocation, setMapBounds } =
    useMapStore();
  const { themeMode } = useThemeStore();
  const { isShowBookMarkPlace, toggleBookmarkDisplay } =
    useBookMarkPlaceStore();

  const currentUser = sessionStorage.getItem('userId');

  const containerStyle = {
    width:
      isListOpen && place !== null
        ? 'calc(100% - 840px)'
        : isListOpen && place === null
        ? 'calc(100% - 420px)'
        : '100%',
    height: 'calc(100vh - 60px)',
    marginLeft: 'auto',
    transition: 'all 200ms ease',
  };

  const getPixelPositionOffset = (width: number, height: number) => ({
    x: -(width / 2),
    y: -(height / 2),
  });

  const downMapLevelHandler = () => {
    const currentLevel = map?.getZoom();
    if (!currentLevel) return;
    setMapLevel(currentLevel - 1);
  };
  const upMapLevelHandler = () => {
    const currentLevel = map?.getZoom();
    if (!currentLevel) return;
    setMapLevel(currentLevel + 1);
  };

  const toggleBookMarkerHandler = () => {
    if (!currentUser) {
      toast.error('로그인 후 이용해주세요.', {
        position: 'bottom-right',
        duration: 4000,
      });
      return;
    }
    toggleBookmarkDisplay();
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAP,
    language: 'ko',
  });

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    // @ts-ignore
    const bounds = new window.google.maps.LatLngBounds(currentLocation);

    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onTileLoaded = () => {
    const bounds = map?.getBounds();
    const northEast = bounds?.getNorthEast();
    const southWest = bounds?.getSouthWest();
    setMapBounds({
      initialLoad: true,
      northEast: { lat: northEast?.lat(), lng: northEast?.lng() },
      southWest: { lat: southWest?.lat(), lng: southWest?.lng() },
    });
  };

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  const moveMyLocation = async () => {
    try {
      toast.loading('현재 위치를 업데이트 중입니다...', {
        position: 'bottom-right',
        id: '1',
      });
      const { latitude, longitude } = await getCurrentCoords();
      setCurrentLocation({ lat: latitude, lng: longitude });
    } finally {
      toast.remove('1');
      toast.success('현재 위치를 업데이트하였습니다.', {
        position: 'bottom-right',
      });
    }
  };

  return isLoaded ? (
    <CustomMap
      mapContainerStyle={containerStyle}
      // @ts-ignore
      center={currentLocation}
      zoom={mapLevel}
      onLoad={onLoad}
      onTilesLoaded={onTileLoaded}
      onUnmount={onUnmount}
      options={{
        gestureHandling: 'greedy',
        disableDefaultUI: true,
        panControl: false,
        minZoom: 13,
        maxZoom: 18,
        clickableIcons: false,
        styles: themeMode === 'LightMode' ? lightMapTheme : darkMapTheme,
        backgroundColor: 'none',
      }}
    >
      <OverlayViewF
        // @ts-ignore
        position={currentLocation}
        mapPaneName={OverlayView.OVERLAY_LAYER}
        getPixelPositionOffset={getPixelPositionOffset}
      >
        <CurrentLocationMarker />
      </OverlayViewF>
      {placeDatas?.map((db) => (
        <LocationMarker
          key={db.storeName}
          placeDb={db}
          isListOpen={isListOpen}
          setIsListOpen={setIsListOpen}
        />
      ))}

      {isShowBookMarkPlace &&
        bookmarkPlaces?.map((db) => (
          <BookmarkLocationMarker key={db.Location.locationId} placeDb={db} />
        ))}
      <CurrentLocationButton moveMyLocation={moveMyLocation} position="map" />
      <BookMarkLocationButton
        toggleBookMarkerHandler={toggleBookMarkerHandler}
        position="map"
      />
      <LevelButton
        downMapLevelHandler={downMapLevelHandler}
        upMapLevelHandler={upMapLevelHandler}
        position="map"
      />
    </CustomMap>
  ) : (
    <></>
  );
};

export default MapGoogle;

const CustomMap = styled(GoogleMap)``;
