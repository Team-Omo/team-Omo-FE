import styled from 'styled-components';

interface Props {
  isShowBookMarkPlace?: boolean;
}

export const BookmarkIcon: React.FC<Props> = ({ isShowBookMarkPlace }) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <PathFirst
        d="M14.0166 1.66602H5.98327C4.20827 1.66602 2.7666 3.11602 2.7666 4.88268V16.6243C2.7666 18.1243 3.8416 18.7577 5.15827 18.0327L9.22494 15.7743C9.65827 15.5327 10.3583 15.5327 10.7833 15.7743L14.8499 18.0327C16.1666 18.766 17.2416 18.1327 17.2416 16.6243V4.88268C17.2333 3.11602 15.7916 1.66602 14.0166 1.66602Z"
        $isShowBookMarkPlace={isShowBookMarkPlace}
      />
      <PathSecond
        d="M14.0166 1.66602H5.98327C4.20827 1.66602 2.7666 3.11602 2.7666 4.88268V16.6243C2.7666 18.1243 3.8416 18.7577 5.15827 18.0327L9.22494 15.7743C9.65827 15.5327 10.3583 15.5327 10.7833 15.7743L14.8499 18.0327C16.1666 18.766 17.2416 18.1327 17.2416 16.6243V4.88268C17.2333 3.11602 15.7916 1.66602 14.0166 1.66602Z"
        $isShowBookMarkPlace={isShowBookMarkPlace}
      />
    </Svg>
  );
};

const Svg = styled.svg`
  width: 20px;
  height: 20px;
  fill: none;
`;

const PathFirst = styled.path<{ $isShowBookMarkPlace?: boolean }>`
  stroke: ${({ $isShowBookMarkPlace, theme }) =>
    $isShowBookMarkPlace ? theme.color.praimry : theme.color.sub};
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: all 200ms ease;
`;
const PathSecond = styled.path<{ $isShowBookMarkPlace?: boolean }>`
  fill: ${({ $isShowBookMarkPlace, theme }) =>
    $isShowBookMarkPlace ? theme.color.primary : theme.color.sub};
  transition: all 200ms ease;
`;
