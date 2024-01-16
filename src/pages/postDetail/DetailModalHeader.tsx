import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { PostDetailType } from '../../model/interface';
import toast from 'react-hot-toast';
import Dropdown from '../../components/share/dropdown/Dropdown';
import useDropdown from '../../hooks/useDropdown';
import DropdownItem from '../../components/share/dropdown/DropdownItem';
import useDeleteContentMutation from '../../hooks/reactQuery/post/useDeletePostsMutation';
import Modal from '../../components/Modal/Modal';
import PatchModal from '../patch/PatchModal';
import useModalCtr from '../../hooks/useModalCtr';
import { MeatballIcon } from '../../assets/icons/MeatballIcon';
import Profile from '../../components/profile/Profile';

const DetailModalHeader: React.FC<{
  userName: string;
  userProfile: string;
  createdAt: string;
  contentId: number | undefined;
  closeModalHandler: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  post: PostDetailType;
  userId: number;
}> = ({
  userProfile,
  userName,
  createdAt,
  contentId,
  closeModalHandler,
  post,
  userId,
}) => {
  const currentUserId = Number(window.sessionStorage.getItem('userId'));
  const { isDropdownOpen, setIsDropdownOpen } = useDropdown();
  const {
    isModalOpen: isPatchModalOpen,
    handleModalClose: handlePatchModalClose,
    handleModalOpen: handlePatchModalOpen,
  } = useModalCtr();
  const {
    isModalOpen: isConfirmModalOpen,
    handleModalClose: handleConfirmModalClose,
    handleModalOpen: handleConfirmModalOpen,
  } = useModalCtr();

  const [isShow, setIsShow] = React.useState<boolean>(false);
  // const navigate = useNavigate();

  // const onClickMoveUserPage = () => {
  //   const checkUserId = sessionStorage.getItem('userId');
  //   !checkUserId
  //     ? toast.error('로그인 후 이용해주세요.', {
  //         position: 'bottom-right',
  //         duration: 4000,
  //       })
  //     : navigate(`/userpage/${userName}`);
  // };

  const showProfile = () => {
    setIsShow(true);
  };
  const hideProfile = () => {
    setIsShow(false);
  };

  const { deleteMutate } = useDeleteContentMutation();

  const onClickDelete = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    deleteMutate(contentId);
    closeModalHandler(e);
  };

  return (
    <>
      <Base>
        <UserProfile
          $userProfile={userProfile}
          onMouseEnter={showProfile}
          onMouseLeave={hideProfile}
          $isShow={isShow}
        >
          {isShow && (
            <Profile userName={userName} userProfileImg={userProfile} />
          )}
        </UserProfile>
        <UserInfoContainer>
          <UserName>{userName}</UserName>
          <CreationDate>{createdAt.split('T')[0]}</CreationDate>
        </UserInfoContainer>

        {userId === currentUserId && (
          <Dropdown
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            margin="0 0 0 auto"
            borderRadius="50%"
            padding="0px"
            titleWidth="35px"
            titleHeight="35px"
            width="80px"
            height="90px"
            buttonIcon={<MeatballIcon />}
          >
            <DropdownItem onClick={(e) => handlePatchModalOpen(e)}>
              수정
            </DropdownItem>
            <DropdownItem onClick={(e) => onClickDelete(e)} textColor="red">
              삭제
            </DropdownItem>
          </Dropdown>
        )}
      </Base>
      <Modal isOpen={isPatchModalOpen} onClose={handleConfirmModalOpen}>
        <PatchModal
          handlePatchModalClose={handlePatchModalClose}
          isConfirmModalOpen={isConfirmModalOpen}
          handleConfirmModalOpen={handleConfirmModalOpen}
          handleConfirmModalClose={handleConfirmModalClose}
          post={post}
        />
      </Modal>
    </>
  );
};

export default DetailModalHeader;

const Base = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 15px;
  width: 100%;
`;

const UserProfile = styled.div<{ $userProfile: string; $isShow: boolean }>`
  background-image: ${({ $userProfile }) => `url(${$userProfile})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 50px;
  height: 50px;
  border: 2px solid
    ${({ $isShow, theme }) =>
      $isShow ? theme.color.primary : theme.color.border};
  border-radius: 100%;
  transition: border 0.3s ease-in-out;
  cursor: pointer;
  position: relative;
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 8px;
`;

const UserName = styled.div`
  font-size: 16px;
  font-weight: bold;
  letter-spacing: -0.16px;
  color: ${({ theme }) => theme.color.text};
  cursor: pointer;
`;

const CreationDate = styled.div`
  font-size: 16px;
  font-weight: 500x;
  letter-spacing: -0.16px;
  color: ${({ theme }) => theme.color.sub};
`;
