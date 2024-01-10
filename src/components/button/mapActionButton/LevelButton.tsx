import React from 'react';
import { LuPlus } from 'react-icons/lu';
import { LuMinus } from 'react-icons/lu';
import styled, { css } from 'styled-components';

interface Props {
  downMapLevelHandler: () => void;
  upMapLevelHandler: () => void;
  position?: string;
}

const LevelButton: React.FC<Props> = ({
  downMapLevelHandler,
  upMapLevelHandler,
  position,
}) => {
  return (
    <Base $position={position}>
      <BtnWrapper onClick={upMapLevelHandler}>
        <LuPlus />
      </BtnWrapper>
      <BtnWrapper onClick={downMapLevelHandler}>
        <LuMinus />
      </BtnWrapper>
    </Base>
  );
};

export default LevelButton;

const Base = styled.div<{ $position?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${({ $position }) =>
    $position
      ? css`
          position: absolute;
          right: 45px;
          top: 140px;
          z-index: 2;
        `
      : css`
          null
      `}
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color.sub};
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.color.bg};
  font-size: 26px;
  border: 1px solid ${({ theme }) => theme.color.sub};
  &:hover {
    background: ${({ theme }) => theme.color.hover};
  }
  cursor: pointer;
  &:first-child {
    border-radius: 15px 15px 0 0;
  }
  &:last-child {
    border-radius: 0 0 15px 15px;
  }
`;
