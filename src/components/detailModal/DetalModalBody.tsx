import React from 'react';
import styled from 'styled-components';
import { BiSolidMap } from 'react-icons/bi';
import { FaStar } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';
interface Props {
  placeName: string;
  locationName: string;
  content: string;
  star: number;
}

const DetalModalBody: React.FC<Props> = ({
  placeName,
  locationName,
  content,
  star,
}) => {
  return (
    <Base>
      <Title>{placeName}</Title>
      <StarContainer>
        {/* 별 아이콘을 특정 개수만큼 생성하여 표시 */}
        {Array.from({ length: 5 }, (_, idx) => (
          <StarWrapper key={idx}>
            {idx < star ? <FaStar /> : <FaRegStar />}
          </StarWrapper>
        ))}
        {/* 별점 텍스트 표시 */}
        <span>{star}점</span>
      </StarContainer>
      <PlaceInfo>
        <BiSolidMap />
        <span>{locationName}</span>
      </PlaceInfo>
      <Text>{content}</Text>
    </Base>
  );
};

export default DetalModalBody;

const Base = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

const PlaceInfo = styled.div`
  margin-top: 13px;
  color: #44a5ff;
  font-size: 16px;
  font-weight: 500;
`;

const Text = styled.div`
  margin-top: 33px;
  font-size: 16px;
  font-weight: 500;
  line-height: 155%;
  letter-spacing: -0.16px;
  width: 515px;
`;

const StarContainer = styled.div`
  margin-top: 8px;

  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 2px;
  span {
    margin-top: 6px;
    text-align: center;
    color: #323232;
    font-size: 16px;
    font-weight: 700;
  }
  margin-bottom: 15px;
`;

const StarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  font-size: 20px;
  color: #f97393;
`;
