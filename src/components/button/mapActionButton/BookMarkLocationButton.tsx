import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { BookmarkIcon } from '../../../assets/icons/BookMark';

interface Props {
  toggleBookMarkerHandler?: () => void;
  position?: string;
}

const BookMarkLocationButton = (props: Props) => {
  const [isShowBookMarkPlace, setIsShowBookMarkPlace] =
    useState<boolean>(false);
  const { toggleBookMarkerHandler, position } = props;

  const onClickBtnHandler = () => {
    toggleBookMarkerHandler && toggleBookMarkerHandler();
    setIsShowBookMarkPlace(!isShowBookMarkPlace);
  };

  return (
    <BtnWrapper
      $isShowBookMarkPlace={isShowBookMarkPlace}
      onClick={onClickBtnHandler}
      $position={position}
    >
      <BookmarkIcon isShowBookMarkPlace={isShowBookMarkPlace} />
    </BtnWrapper>
  );
};

export default BookMarkLocationButton;

interface BtnWrapperProps {
  $isShowBookMarkPlace: boolean;
  $position?: string;
}

const BtnWrapper = styled.div<BtnWrapperProps>`
  z-index: 3;

  ${({ $position }) =>
    $position === 'map'
      ? css`
          position: absolute;
          right: 45px;
          top: 40px;
        `
      : css`null`};

  display: flex;
  justify-content: center;
  align-items: center;

  color: ${({ theme }) => theme.color.sub};
  font-size: 26px;
  background: ${({ theme }) => theme.color.bg};
  border: 1px solid
    ${({ $isShowBookMarkPlace, theme }) =>
      $isShowBookMarkPlace ? theme.color.primary : theme.color.sub};
  border-radius: 15px;

  width: 40px;
  height: 40px;

  &:hover {
    background: ${({ theme }) => theme.color.hover};
  }

  cursor: pointer;
`;
