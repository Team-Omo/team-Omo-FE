import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowRoundBack } from 'react-icons/io';
import ConfirmModal from './ConfirmModal';
import { SelectedInfoType } from '../../model/interface';
import SubModal from '../../components/Modal/SubModal';
import usePostContentMutate from '../../hooks/reactQuery/post/usePostContentQuery';
import toast from 'react-hot-toast';
import Button from '../../components/button/Button';
import { validatePublishing } from '../../utils/validationPublishing';
import { postLoading } from '../../components/alert/postAlert';
import ImageUpload from './ImageUpload';
import SearchPlace from './SearchPlace';
import PostTextArea from '../../components/textarea/PostTextArea';
import StarButton from '../../components/button/StarButton';

interface Props {
  closeMainModal: (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => void;
  isSubModalOpen: boolean;
  openSubModal: (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => void;
  closeSubModal: (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => void;
}

const PublicModal: React.FC<Props> = ({
  closeMainModal,
  isSubModalOpen,
  openSubModal,
  closeSubModal,
}) => {
  const [imageURL, setImageUrl] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [starNum, setStarNum] = useState(0);
  const [searchValue, setSearchValue] =
    useState<kakao.maps.services.PlacesSearchResult>([]);
  const [selectedInfo, setSelectedInfo] = useState<SelectedInfoType>({
    placeName: '',
    addressName: '',
    categoryName: '',
    latitude: '',
    longitude: '',
  });
  const [text, setText] = useState('');
  const [googleSearchResult, setGoogleSearchResult] = useState<
    google.maps.places.PlaceResult[] | null
  >(null);

  const { postContentMutate, isPostContentLoading } = usePostContentMutate();

  const clearPostHandler = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => {
    closeMainModal(e);
    closeSubModal(e);
    setImageUrl([]);
    setSelectedInfo({
      placeName: '',
      addressName: '',
      categoryName: '',
      latitude: '',
      longitude: '',
    });
    setText('');
    setGoogleSearchResult(null);
  };

  const savePostHandler = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => {
    if (
      !validatePublishing(files.length, selectedInfo.placeName, starNum, text)
    )
      return;

    const newContent = {
      content: text.replace(/(?:\r\n|\r|\n)/g, '<br/>'),
      star: starNum,
      categoryName: selectedInfo.categoryName,
      imgUrl: files,
      storeName: selectedInfo.placeName,
      address: selectedInfo.addressName,
      latitude: selectedInfo.latitude,
      longitude: selectedInfo.longitude,
      placeInfoId: googleSearchResult && googleSearchResult[0].place_id,
    };

    postContentMutate(newContent);
    closeMainModal(e);
  };

  useEffect(() => {
    isPostContentLoading ? postLoading() : toast.remove('10');
  }, [isPostContentLoading]);

  return (
    <Base>
      <Wrapper>
        <Header>
          <BackBtn onClick={openSubModal}>
            <IoIosArrowRoundBack />
          </BackBtn>
          <Title>새 게시글</Title>
          <Button
            theme="gray"
            padding="9px 14px"
            width="49px"
            height="14px"
            onClick={(e) => savePostHandler(e)}
          >
            작성완료
          </Button>
        </Header>
        <ImageUpload
          imageURL={imageURL}
          setImageUrl={setImageUrl}
          files={files}
          setFiles={setFiles}
        />
        <SearchPlace
          selectedInfo={selectedInfo}
          setSelectedInfo={setSelectedInfo}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          googleSearchResult={googleSearchResult}
          setGoogleSearchResult={setGoogleSearchResult}
        />
        <StarButton starNum={starNum} setStarNum={setStarNum} />
        <PostTextArea text={text} setText={setText} />
        <SubModal isOpen={isSubModalOpen}>
          <ConfirmModal
            clearPostHandler={clearPostHandler}
            closeModalHandler={closeSubModal}
          />
        </SubModal>
      </Wrapper>
    </Base>
  );
};

export default PublicModal;

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
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 720px;
  min-height: 800px;
  max-height: 1000px;
  height: 80%;
  padding: 45px;
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
