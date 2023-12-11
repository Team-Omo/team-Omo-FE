import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from '../../styles/Motion';
import styled from 'styled-components';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import useDeleteContentQuery from '../../hooks/useDeleteContentQuery';
import useModalCtr from '../../hooks/useModalCtr';
import Modal from '../Modal/Modal';
import PatchContentModal from './PatchContentModal';

const DetailModalDropdown: React.FC<{
  contentId: number | undefined;
  closeModalHandler: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}> = ({ contentId, closeModalHandler }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isModalOpen, setModalIsOpen, toggleModalHandler } = useModalCtr();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { deleteMutate, isDeleteLoading } = useDeleteContentQuery();

  const toggleDropdownHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const onClickPatch = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    toggleModalHandler();
  };

  const onClickDelete = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    deleteMutate(contentId);
    closeModalHandler(e);
  };

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [isOpen]);

  return (
    <NavContainer
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      ref={dropdownRef}
    >
      <DropdownBtn whileTap={{ scale: 0.97 }} onClick={toggleDropdownHandler}>
        <motion.div
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 },
          }}
          transition={{ duration: 0.2 }}
          style={{ originY: 0.55 }}
        >
          <IoEllipsisHorizontalSharp style={{ marginTop: '4px' }} />
        </motion.div>
      </DropdownBtn>
      <DropdownList
        variants={{
          open: {
            clipPath: 'inset(0% 0% 0% 0% round 10px)',
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05,
            },
          },
          closed: {
            clipPath: 'inset(10% 50% 90% 50% round 10px)',
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.3,
            },
          },
        }}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        <DropdownItem variants={itemVariants} onClick={(e) => onClickPatch(e)}>
          수정하기
        </DropdownItem>
        <DropdownItem
          variants={itemVariants}
          onClick={(e) => onClickDelete(e)}
          style={{ color: 'red' }}
        >
          삭제하기
        </DropdownItem>
      </DropdownList>
      <Modal isOpen={isModalOpen} onClose={toggleModalHandler}>
        <PatchContentModal />
      </Modal>
    </NavContainer>
  );
};

export default DetailModalDropdown;

const NavContainer = styled(motion.nav)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  height: 30px;
  position: relative;
`;

const DropdownBtn = styled(motion.button)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  width: 30px;
  height: 30px;
  padding: 10px 15px;
  background: #fff;
  border-radius: 41px;
  border: none;
  background: #fff;
  cursor: pointer;
  &:hover {
    background: #e8e8e8;
  }
`;

const DropdownList = styled(motion.div)<{ width?: string; height?: string }>`
  box-sizing: border-box;

  position: absolute;
  top: 30px;

  background: #fff;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 98px;
  height: 94px;

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  z-index: 99;

  border: 1px solid #e8e8e8;
  border-radius: 13px;
`;

const DropdownItem = styled(motion.div)`
  padding: 15px 20px;
  color: #000;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background: #e8e8e8;
  }
  &:first-child {
    border-radius: 12px 12px 0 0;
  }
  &:last-child {
    border-radius: 0 0 12px 12px;
  }
`;
