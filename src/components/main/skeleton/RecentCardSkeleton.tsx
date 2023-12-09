import React, { useState } from 'react';
import styled from 'styled-components';
import { IoMdHeartEmpty } from 'react-icons/io';
import { TbMessage2 } from 'react-icons/tb';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './recentCardSkeleton.css';

const RecentCardSkeleton: React.FC = () => {
  return (
    <Base>
      <Skeleton className="img" />
      <HeaderContainer>
        <Skeleton className="nickname" />
        <VerticalLine />
        <Skeleton className="date" />
      </HeaderContainer>
      <Skeleton className="content" />
      <Footer>
        <FooterItem>
          <Skeleton className="footer" />
        </FooterItem>
      </Footer>
    </Base>
  );
};

export default RecentCardSkeleton;

const ImgContainer = styled.div<{ imageURL: string[] }>`
  width: 285px;
  height: 181px;
  border-radius: 8px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: ${({ imageURL }) => `url(${imageURL[0]})`};
`;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  cursor: pointer;
  &:hover ${ImgContainer} {
    transform: translateY(-10px);
  }
`;

const HeaderContainer = styled.div`
  margin-top: 12px;
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 5px;
`;

const VerticalLine = styled.div`
  border-right: 1px solid #a9a9a9;
  width: 1px;
  height: 12px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 21px;
  gap: 8px;
`;

const FooterItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  color: #a9a9a9;
  svg {
    font-size: 20px;
  }
  span {
    font-size: 14px;
    font-weight: 500;
  }
`;
