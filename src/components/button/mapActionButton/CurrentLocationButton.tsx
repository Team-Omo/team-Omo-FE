import React from 'react';
import { MdMyLocation } from 'react-icons/md';
import styled, { css } from 'styled-components';

interface Props {
  moveMyLocation: () => void;
  position?: string;
}

const CurrentLocationButton = (props: Props) => {
  const { moveMyLocation, position } = props;

  return (
    <BtnWrapper onClick={moveMyLocation} $position={position}>
      <MdMyLocation />
    </BtnWrapper>
  );
};

export default CurrentLocationButton;

const BtnWrapper = styled.div<{ $position?: string }>`
  z-index: 3;
  ${({ $position }) =>
    $position === 'map'
      ? css`
          position: absolute;
          right: 45px;
          top: 90px;
        `
      : css`null`};

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
