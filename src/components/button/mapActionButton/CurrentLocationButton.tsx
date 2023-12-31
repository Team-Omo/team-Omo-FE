import React from 'react';
import { MdMyLocation } from 'react-icons/md';
import styled from 'styled-components';
import { getCurrentCoords } from '../../../utils/kakao';
import useMapStore from '../../../store/location/googleMapStore';
import toast from 'react-hot-toast';

const CurrentLocationButton = () => {
  const { setCurrentLocation } = useMapStore();

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

  return (
    <BtnWrapper onClick={moveMyLocation}>
      <MdMyLocation />
    </BtnWrapper>
  );
};

export default CurrentLocationButton;

const BtnWrapper = styled.div`
  z-index: 3;
  position: absolute;
  right: 45px;
  top: 90px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: ${({ theme }) => theme.color.sub};
  font-size: 26px;
  background: ${({ theme }) => theme.color.bg};
  border: 1px solid ${({ theme }) => theme.color.sub};
  border-radius: 15px;

  width: 40px;
  height: 40px;

  &:hover {
    background: ${({ theme }) => theme.color.hover};
  }

  cursor: pointer;
`;
