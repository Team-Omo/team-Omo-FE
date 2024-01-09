import React, { useState } from 'react';
import styled from 'styled-components';

const Header = () => {
  const [isSelected, setIsSelected] = useState('둘러보기');

  const changeCategory = (category: string) => {
    setIsSelected(category);
  };

  return (
    <Base>
      <Category
        $selected={isSelected === '둘러보기'}
        onClick={() => changeCategory('둘러보기')}
      >
        둘러보기
      </Category>
      {/* <Category
        $selected={isSelected === '인기 장소'}
        onClick={() => changeCategory('인기 장소')}
      >
        인기 게시글
      </Category> */}
    </Base>
  );
};

export default Header;

const Base = styled.div`
  box-sizing: border-box;
  padding: 20px;
  margin-top: 20px;
  width: 100%;

  display: flex;
  justify-content: start;
  align-items: center;

  gap: 25px;
`;

const Category = styled.div<{ $selected: boolean }>`
  color: ${({ theme }) => theme.color.text};
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  padding-bottom: 10px;
  border-bottom: ${({ $selected }) =>
    $selected ? '3px solid #f97393' : '3px solid transparent'};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.sub2};
  }
`;
