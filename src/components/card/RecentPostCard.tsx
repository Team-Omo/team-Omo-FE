import React from 'react';
import styled from 'styled-components';
import { IoMdHeartEmpty } from 'react-icons/io';
import { TbMessage2 } from 'react-icons/tb';
import Modal from '../Modal/Modal';
import { RecentPostsType } from '../../model/interface';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import useModalCtr from '../../hooks/useModalCtr';
import PostDetailModal from '../../pages/postDetail/PostDetailModal';

const RecentPostCard: React.FC<{ post: RecentPostsType }> = ({ post }) => {
  const { isModalOpen, handleModalClose, handleModalOpen } = useModalCtr();

  const { User, createdAt, content, likeCount, commentCount, imgUrl } = post;

  return (
    <Base onClick={(e) => handleModalOpen(e)}>
      <ImgContainer src={imgUrl[0]} />
      <HeaderContainer>
        <Title>{User.nickname}</Title>
        <VerticalLine />
        <Date>{createdAt.split('T')[0]}</Date>
      </HeaderContainer>
      <Text dangerouslySetInnerHTML={{ __html: content }} />
      <Footer>
        <FooterItem>
          <IoMdHeartEmpty />
          <span>{likeCount}</span>
        </FooterItem>
        <FooterItem>
          <TbMessage2 />
          <span>{commentCount}</span>
        </FooterItem>
      </Footer>
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <PostDetailModal
          postId={post.postId}
          closeModalHandler={handleModalClose}
        />
      </Modal>
    </Base>
  );
};

export default RecentPostCard;

const ImgContainer = styled(LazyLoadImage)`
  width: 285px;
  height: 181px;
  border-radius: 8px;
  object-fit: cover;
  object-position: center;
  transition: all 300ms ease-in-out;
`;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  cursor: pointer;
  &:hover ${ImgContainer} {
    transform: translateY(-10px);
    box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px,
      rgba(0, 0, 0, 0.05) 0px 5px 10px;
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

const Title = styled.div`
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.sub};
`;

const VerticalLine = styled.div`
  border-right: 1px solid #a9a9a9;
  width: 1px;
  height: 12px;
`;

const Date = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.color.sub};
`;

const Text = styled.div`
  margin-top: 18px;
  line-height: 140%;
  font-size: 16px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 20px;
  width: 270px;
  color: ${({ theme }) => theme.color.text};
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
  color: ${({ theme }) => theme.color.sub2};
  svg {
    font-size: 20px;
  }
  span {
    font-size: 14px;
    font-weight: 500;
  }
`;
