import React, { useState } from 'react';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';
import { StarButtonProps } from './types';

const StarButton = (props: StarButtonProps) => {
  const { starNum, onClick } = props;
  const [hover, setHover] = useState(0);
  const starArr = [1, 2, 3, 4, 5];

  return (
    <Base>
      {starArr.map((idx) => (
        <BtnWrapper
          key={idx}
          onClick={() => onClick(idx)}
          onMouseEnter={() => setHover(idx)}
          onMouseLeave={() => setHover(0)}
        >
          {idx <= hover || idx <= starNum ? <FaStar /> : <FaRegStar />}
        </BtnWrapper>
      ))}
      <Rating>{!starNum ? hover : starNum}점</Rating>
    </Base>
  );
};

export default StarButton;

const Base = styled.div`
  margin-top: 8px;

  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  font-size: 20px;
  color: #f97393;
  &:hover {
    color: #f97393;
  }
  cursor: pointer;
`;

const Rating = styled.div`
  text-justify: center;
  text-align: center;
  margin-top: 5px;
  margin-left: 3px;
  color: ${({ theme }) => theme.color.text};
  font-size: 16px;
  font-weight: 700;
`;
