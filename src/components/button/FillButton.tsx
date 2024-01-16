import React from 'react';
import { FillButtonProps } from './types';
import styled, { css } from 'styled-components';

const FillButton = (props: FillButtonProps) => {
  const { onClick, children, icon, size, color } = props;

  return (
    <Button role="button" onClick={onClick} $size={size} $color={color}>
      {icon && icon}
      <span>{children}</span>
    </Button>
  );
};

export default FillButton;

interface ButtonProps {
  $size: string;
  $color: string;
}

const Button = styled.button<ButtonProps>`
  box-sizing: content-box;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  border: none;
  border-radius: 8px;
  ${({ $color }) =>
    $color === 'primary'
      ? css`
          background: ${({ theme }) => theme.color.subPrimary};
          &:hover {
            background: ${({ theme }) => theme.color.subPrimaryHover};
          }
        `
      : $color === 'blue'
      ? css`
          background: ${({ theme }) => theme.color.link};
          &:hover {
            background: ${({ theme }) => theme.color.linkHover};
          }
        `
      : css`
          background: ${({ theme }) => theme.color.sub2};
          &:hover {
            background: ${({ theme }) => theme.color.sub};
            color: #148dff;
          }
        `}

  ${({ $size }) =>
    $size === 'sm'
      ? css`
          width: 70px;
          height: 25px;
        `
      : $size === 'md'
      ? css`
          width: 70px;
          height: 20px;
          padding: 9px 0;
        `
      : css`
          width: 91px;
          height: 20px;
          padding: 9px 0;
        `}
  span {
    color: #fff;
    font-size: 14px;
    font-weight: 700;
  }
  svg {
    color: #fff;
  }
  cursor: pointer;
`;
