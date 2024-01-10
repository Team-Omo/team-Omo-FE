import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { IoIosArrowRoundBack } from 'react-icons/io';
import PostModalImage from './Image';
import { PostDetailType, SelectedInfoType } from '../../model/interface';
import SubModal from '../../components/Modal/SubModal';
import usePatchPostMutation from '../../hooks/reactQuery/post/usePatchPostMutation';
import SearchPlace from '../publishing/SearchPlace';
import StarButton from '../../components/button/StarButton';
import PostTextArea from '../../components/textarea/PostTextArea';
import ConfirmModal from '../publishing/ConfirmModal';

interface Props {
  post: PostDetailType;
  handlePatchModalClose: (
    e: React.MouseEvent<
      HTMLDivElement | HTMLButtonElement | HTMLLIElement,
      MouseEvent
    >,
  ) => void;
  isConfirmModalOpen: boolean;
  handleConfirmModalOpen: (
    e: React.MouseEvent<
      HTMLDivElement | HTMLButtonElement | HTMLLIElement,
      MouseEvent
    >,
  ) => void;
  handleConfirmModalClose: (
    e: React.MouseEvent<
      HTMLDivElement | HTMLButtonElement | HTMLLIElement,
      MouseEvent
    >,
  ) => void;
}

const PatchModal: React.FC<Props> = ({
  post,
  handlePatchModalClose,
  isConfirmModalOpen,
  handleConfirmModalOpen,
  handleConfirmModalClose,
}) => {
  const { postId, content, imgUrl, star, Location } = post;
  const [isValidate, setIsValidate] = useState<boolean>(true);
  const [imageURL, setImageUrl] = useState<string[]>(imgUrl);
  const [starNum, setStarNum] = useState(star);
  const [searchValue, setSearchValue] =
    useState<kakao.maps.services.PlacesSearchResult>([]);
  const [selectedInfo, setSelectedInfo] = useState<SelectedInfoType>({
    placeName: Location.storeName,
    addressName: Location.address,
    categoryName: Location.Category.categoryName,
    latitude: String(Location.latitude),
    longitude: String(Location.longitude),
  });

  const [googlePlaceInfoId, setGooglePlaceInfoId] = useState(
    Location.placeInfoId,
  );
  const [googleSearchResult, setGoogleSearchResult] = useState<
    google.maps.places.PlaceResult[] | null
  >(null);
  const [text, setText] = useState(content);
  const { patchMutate, isPatchLoading } = usePatchPostMutation();

  const clearPostHandler = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => {
    handlePatchModalClose(e);
    setImageUrl([]);
    setSelectedInfo({
      placeName: '',
      addressName: '',
      categoryName: '',
      latitude: '',
      longitude: '',
    });
    setText('');
    setGooglePlaceInfoId('');
  };

  useEffect(() => {
    if (imageURL.length !== 0 && text && selectedInfo.placeName) {
      setIsValidate(true);
    } else {
      setIsValidate(false);
    }
  }, [imageURL, text, searchValue, selectedInfo.placeName]);

  const savePostHandler = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => {
    const newPost = {
      address: selectedInfo.addressName,
      content: text.replace(/(?:\r\n|\r|\n)/g, '<br/>'),
      star: starNum,
      storeName: selectedInfo.placeName,
      placeInfoId:
        googlePlaceInfoId !== ''
          ? googlePlaceInfoId
          : googleSearchResult && googleSearchResult[0].place_id,
      categoryName: selectedInfo.categoryName,
      latitude: selectedInfo.latitude,
      longitude: selectedInfo.longitude,
    };
    if (isValidate) {
      patchMutate({ postId, newPost });
      clearPostHandler(e);
    }
  };

  const saveStarHandler = (star: number) => {
    setStarNum(star);
  };

  return (
    <Base>
      <Wrapper>
        <Header>
          <BackBtn onClick={handleConfirmModalOpen}>
            <IoIosArrowRoundBack />
          </BackBtn>
          <Title>새 게시글</Title>
          <CompleteBtn
            onClick={(e) => savePostHandler(e)}
            $disable={!isValidate}
          >
            작성완료
          </CompleteBtn>
        </Header>
        <PostModalImage imgUrl={imageURL} />
        <SearchPlace
          selectedInfo={selectedInfo}
          setSelectedInfo={setSelectedInfo}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          googleSearchResult={googleSearchResult}
          setGoogleSearchResult={setGoogleSearchResult}
        />
        <StarButton starNum={starNum} onClick={saveStarHandler} />
        <PostTextArea text={text} setText={setText} />
        <SubModal isOpen={isConfirmModalOpen}>
          <ConfirmModal
            clearPostHandler={clearPostHandler}
            closeModalHandler={handleConfirmModalClose}
          />
        </SubModal>
      </Wrapper>
    </Base>
  );
};

export default PatchModal;

const Base = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: ${({ theme }) => theme.color.bg};

  display: flex;
  justify-content: center;
  align-items: start;

  width: 725px;
  min-height: 800px;
  max-height: 1000px;
  height: 80%;

  border-radius: 16px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color.border};
    border-radius: 20px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const Wrapper = styled.div`
  width: 700px;
  height: 950px;
  border-radius: 16px;
  background: ${({ theme }) => theme.color.bg};

  padding: 27px 50px;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  transition: all 200ms ease-in;
  margin-bottom: 40px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BackBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 40px;
  color: ${({ theme }) => theme.color.sub2};
  cursor: pointer;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.text};
  letter-spacing: -0.2px;
`;

const CompleteBtn = styled.div<{ $disable: boolean }>`
  padding: 10px 15px;
  font-size: 14px;
  font-weight: 700;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  ${({ $disable }) =>
    $disable
      ? css`
          background: #b1b1b1;
        `
      : css`
          background: #44a5ff;
          &:hover {
            background-color: #f97476;
          }
        `}

  transition: all 200ms ease-in;
`;
