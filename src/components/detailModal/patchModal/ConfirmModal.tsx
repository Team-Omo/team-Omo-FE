import React from 'react';
import styled from 'styled-components';
import Button from '../../share/Button';

interface Props {
  closeModalHandler: (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => void;
  clearPostHandler: (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => void;
}

const ConfirmModal: React.FC<Props> = ({
  closeModalHandler,
  clearPostHandler,
}) => {
  const onClickYesBtn = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => {
    clearPostHandler(e);
  };

  const onClickNoBtn = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => {
    closeModalHandler(e);
  };

  return (
    <Base>
      <Title>
        <div>작업중인 게시물이 삭제됩니다.</div>
        <div className="alert">삭제하시겠습니까?</div>
      </Title>
      <BtnWrapper>
        <Button
          outlineColor="red"
          padding="10px 20px"
          width="40px"
          height="15px"
          fontSize="14px"
          fontWeight="700"
          onClick={(e) => onClickYesBtn(e)}
        >
          예
        </Button>
        <Button
          outlineColor="blue"
          padding="10px 20px"
          width="40px"
          height="15px"
          fontSize="14px"
          fontWeight="700"
          onClick={(e) => onClickNoBtn(e)}
        >
          아니오
        </Button>
      </BtnWrapper>
    </Base>
  );
};

export default ConfirmModal;

const Base = styled.div`
  width: 335px;
  height: 287px;
  border-radius: 16px;

  background: ${({ theme }) => theme.color.cardBg};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color.text};

  text-align: center;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.2px;
  .alert {
    margin-top: 10px;
    font-size: 22px;
    font-weight: 700;
  }
`;

const BtnWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;
