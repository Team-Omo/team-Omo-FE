import React from 'react';
import styled from 'styled-components';
import DetailModalHeader from './DetailModalHeader';
import DetailModalBody from './DetalModalBody';
import DetailModalFooter from './DetailModalFooter';
import Comment from '../comment/Comment';
import { CommentType, ContentType } from '../../model/interface';

const DetailContentsModal: React.FC<{
  cont: ContentType;
  comments: CommentType[];
  closeModalHandler: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}> = ({ cont, comments, closeModalHandler }) => {
  const {
    id,
    userId,
    placeName,
    createdAt,
    locationName,
    content,
    likeCount,
    imageURL,
    star,
  } = cont;
  console.log(id);
  return (
    <Base>
      <DetailModalHeader
        userId={userId}
        createdAt={createdAt}
        contentId={id}
        closeModalHandler={closeModalHandler}
      />
      <ImageContainer imageURL={imageURL} />
      <DetailModalBody
        placeName={placeName}
        locationName={locationName}
        content={content}
        star={star}
      />
      <DetailModalFooter likeCount={likeCount} />
      <Comment contentId={id} comments={comments} />
    </Base>
  );
};

export default DetailContentsModal;

const Base = styled.div`
  width: 700px;
  height: 900px;
  background-color: #fff;
  border-radius: 16px;

  padding: 50px;
  z-index: 99;
  overflow-y: scroll;
`;

const ImageContainer = styled.div<{ imageURL: string[] }>`
  margin-top: 16px;
  width: 100%;
  height: 600px;
  border-radius: 16px;
  background: #d9d9d9;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: ${({ imageURL }) => `url(${imageURL[0]})`};
`;
