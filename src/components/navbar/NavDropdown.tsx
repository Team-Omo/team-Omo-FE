import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { MdOutlineDarkMode, MdOutlineWbSunny } from 'react-icons/md';
import { FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import useThemeStore from '../../store/theme/themeStore';
import toast from 'react-hot-toast';
import { itemVariants } from '../../styles/Motion';
import useLogoutMutation from '../../hooks/reactQuery/auth/useLogoutMutation';

const NavDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [errorType, setErrorType] = useState<string | null>(null);
  const { themeMode, toggleTheme } = useThemeStore();
  const { logoutMutate } = useLogoutMutation();

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

  const toggleDropdownHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const clickToggleBtn = () => {
    toggleTheme();
    setIsOpen(false);
  };

  const navigate = useNavigate();

  const userId = sessionStorage.getItem('userId');

  const handleLogout = () => {
    logoutMutate();
    setIsOpen(false), navigate('/');
  };

  const onClickMyPageBtn = () => {
    if (userId) {
      navigate('/mypage');
      setIsOpen(false);
    } else {
      setErrorType('required');
      toast.error('로그인 후 이용해주세요.', {
        position: 'bottom-right',
        duration: 4000,
      });
      setIsOpen(false);
    }
  };

  const handleLogin = () => {
    setIsOpen(false);
    navigate('/login');
  };

  return (
    <NavContainer
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      ref={dropdownRef}
    >
      <DropdownBtn
        whileTap={{ scale: 0.97 }}
        onClick={(e) => toggleDropdownHandler(e)}
      >
        <BtnWrapper>
          <FiUser />
        </BtnWrapper>
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
            clipPath: 'inset(0% 0% 100% 100% round 10px)',
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.3,
            },
          },
        }}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        <DropdownItem onClick={onClickMyPageBtn} variants={itemVariants}>
          내 정보
        </DropdownItem>
        <DropdownItem variants={itemVariants} onClick={clickToggleBtn}>
          {themeMode === 'LightMode' ? (
            <>
              <MdOutlineDarkMode />
              <span>다크 모드</span>
            </>
          ) : (
            <>
              <MdOutlineWbSunny />
              <span>라이트 모드</span>
            </>
          )}
        </DropdownItem>
        {userId ? (
          <DropdownItem
            onClick={handleLogout}
            variants={itemVariants}
            style={{ color: 'red' }}
          >
            로그아웃
          </DropdownItem>
        ) : (
          <DropdownItem
            onClick={handleLogin}
            variants={itemVariants}
            style={{ color: 'red' }}
          >
            로그인
          </DropdownItem>
        )}
      </DropdownList>
    </NavContainer>
  );
};

export default NavDropdown;

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
  width: 35px;
  height: 35px;
  padding: 10px 15px;
  border-radius: 41px;
  border: none;
  background: ${({ theme }) => theme.color.bg};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.color.hover};
  }
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4px;
  font-size: 22px;
  color: ${({ theme }) => theme.color.sub};
`;

const DropdownList = styled(motion.div)<{ width?: string; height?: string }>`
  box-sizing: border-box;

  position: absolute;
  top: 40px;
  right: 0;

  background: ${({ theme }) => theme.color.cardBg};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 120px;
  height: 142px;

  border: 1px solid ${({ theme }) => theme.color.border2};

  z-index: 99;
  border-radius: 13px;
`;

const DropdownItem = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  box-sizing: border-box;
  width: 118px;
  padding: 15px 10px;
  color: ${({ theme }) => theme.color.text};
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.color.hover};
  }
  &:first-child {
    border-bottom: 1px solid ${({ theme }) => theme.color.border2};
    border-radius: 13px 13px 0 0;
  }
  &:last-child {
    border-top: 1px solid ${({ theme }) => theme.color.border2};
    border-radius: 0 0 13px 13px;
  }
`;
