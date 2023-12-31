import React from 'react';
import styled from 'styled-components';
import { HotPostsType } from '../../model/interface';

import useModalCtr from '../../hooks/useModalCtr';
import PlaceInfoModal from '../../pages/main/hotContents/placeInfo/PlaceInfoModal';
import LocationModal from '../Modal/LocationModal';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface Props {
  post: HotPostsType;
}

const HotPostsCard: React.FC<Props> = ({ post }) => {
  const { isModalOpen, handleModalClose, handleModalOpen } = useModalCtr();
  const { imgUrl, Location, content, Category: category } = post;

  return (
    <Base onClick={(e) => handleModalOpen(e)}>
      <Wrapper>
        <ImgContainer>
          <LazyLoadImg src={imgUrl[0]} />
        </ImgContainer>
        <Title>{Location.storeName}</Title>
        <BodyConatiner>
          <Text dangerouslySetInnerHTML={{ __html: content }} />
          <FooterContainer>
            <Category>#{category.categoryName}</Category>
          </FooterContainer>
        </BodyConatiner>
      </Wrapper>
      <LocationModal isOpen={isModalOpen} onClose={handleModalClose}>
        <PlaceInfoModal post={post} />
      </LocationModal>
    </Base>
  );
};

export default HotPostsCard;
const ImgContainer = styled.div`
  width: 343px;
  height: 155px;
  border-radius: 8px;
  overflow: hidden;
`;

const LazyLoadImg = styled(LazyLoadImage)`
  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: center;

  transition: all 300ms ease;
`;

const Base = styled.div`
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.color.cardBorder};
  background: ${({ theme }) => theme.color.cardBg};
  border-radius: 16px;
  &:hover ${LazyLoadImg} {
    transform: scale(1.1);
  }
  &:hover {
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  }
  cursor: pointer;
  transition: all 300ms ease;
`;

const Wrapper = styled.div`
  width: 343px;
  height: 280px;
  padding: 20px;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.color.text};
  font-size: 20px;
  font-weight: 700;
  margin: 12px 0 10px 0;
`;

const BodyConatiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  height: 90px;
`;

const Text = styled.div`
  color: ${({ theme }) => theme.color.sub};
  font-size: 16px;
  font-weight: 500;
  line-height: 155%; /* 24.8px */
  letter-spacing: -0.16px;
  height: 50px;

  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: normal;
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;
`;

const Category = styled.div`
  color: #f97393;
  font-size: 14px;
  font-weight: 700;
`;
