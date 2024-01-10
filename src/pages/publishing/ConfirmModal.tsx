import React from 'react';
import styled from 'styled-components';
import Button from '../../components/button/Button';
import OutlineButton from '../../components/button/OutlineButton';

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
  const onClickNoBtn = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => {
    closeModalHandler(e);
  };

  const onClickYesBtn = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => {
    clearPostHandler(e);
    closeModalHandler(e);
  };

  return (
    <Base>
      <Title>😥정말 나가시겠어요?</Title>
      <SubText>저장하지 않은 내용을 잃어버릴 수 있어요.</SubText>
      <BtnWrapper>
        <OutlineButton color="red" size="md" onClick={(e) => onClickYesBtn(e)}>
          예
        </OutlineButton>
        <OutlineButton color="blue" size="md" onClick={(e) => onClickNoBtn(e)}>
          아니오
        </OutlineButton>
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
  color: ${({ theme }) => theme.color.text};

  text-align: center;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.2px;
`;

const SubText = styled.div`
  color: ${({ theme }) => theme.color.sub};

  margin-top: 15px;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.2px;
`;

const BtnWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;
