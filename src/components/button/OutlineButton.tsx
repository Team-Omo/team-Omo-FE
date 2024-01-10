import React from 'react';
import { ButtonProps } from './types';
import styled, { css } from 'styled-components';

const OutlineButton = (props: ButtonProps) => {
  const { color = 'red', size = 'md', children, onClick } = props;

  return (
    <Button $color={color} $size={size} onClick={onClick}>
      <span>{children}</span>
    </Button>
  );
};

export default OutlineButton;

interface ButtonStyleProps {
  $color: string;
  $size: string;
}

const Button = styled.button<ButtonStyleProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  padding: 10px;
  background: ${({ theme }) => theme.color.cardBg};
  border-radius: 8px;

  ${({ $color, theme }) =>
    $color === 'red'
      ? css`
          border: 1px solid ${theme.color.primary};
          &:hover {
            background-color: ${({ theme }) => theme.color.primary};
            span {
              color: #fff;
            }
          }
        `
      : css`
          border: 1px solid ${theme.color.link};
          &:hover {
            background-color: ${({ theme }) => theme.color.link};
            span {
              color: #fff;
            }
          }
        `};

  ${({ $size }) =>
    $size === 'md'
      ? css`
          width: 80px;
        `
      : css`
          width: 106px;
        `}

  span {
    ${({ $color }) =>
      $color === 'red'
        ? css`
            color: ${({ theme }) => theme.color.primary};
          `
        : css`
            color: ${({ theme }) => theme.color.link};
          `};
    text-align: center;
    font-size: 14px;
    font-weight: 700;
  }
  cursor: pointer;
`;
