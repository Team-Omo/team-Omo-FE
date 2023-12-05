import React, { ReactNode, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

interface Props {
  children: ReactNode;
  items: string[];
  width?: string;
  onClickDropdownItem: (item: string) => void;
}

const Dropdown: React.FC<Props> = ({
  children,
  items,
  width,
  onClickDropdownItem,
}) => {
  const [isOpen, setIsDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const openDropdown = () => {
    setIsDropdown(true);
  };

  useEffect(() => {
    const onClickOutSide = (e: MouseEvent) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdown(false);
      }
    };
    document.addEventListener('mousedown', onClickOutSide);
    return () => {
      document.removeEventListener('mousedown', onClickOutSide);
    };
  }, [isOpen]);

  return (
    <Base onClick={openDropdown}>
      {children}
      <List isOpen={isOpen} width={width} ref={dropdownRef}>
        {items.map((item) => (
          <Item key={item} onClick={() => onClickDropdownItem(item)}>
            {item}
          </Item>
        ))}
      </List>
    </Base>
  );
};

export default Dropdown;

const Base = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 100%;
  width: 15px;
  height: 15px;
  &:hover {
    background: #e6e6e6;
  }
  svg {
    font-size: 24px;
  }
  cursor: pointer;
  position: relative;
  background: #fff;
`;

const FadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform:translateY(0);
  };
  
`;

const List = styled.div<{ isOpen: boolean; width?: string }>`
  position: absolute;
  top: 50px;

  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width || '90px'};
  height: auto;
  border-radius: 8px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  padding: 0px 7px;
  background: #fff;
  z-index: 100;
`;

const Item = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 90%;
  height: 15px;
  &:hover {
    background: #f2f4f7;
  }
  cursor: pointer;
  font-size: 15px;
  transition: background 300ms ease-in-out;
  animation: ${FadeIn} 300ms ease-in-out;
  &:first-child {
    border-radius: 8px 8px 0 0;
  }
  &:last-child {
    border-radius: 0 0 8px 8px;
  }
`;
