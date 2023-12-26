import styled from 'styled-components';

export const SearchIcon = () => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.6669 6.33309C18.2444 8.91055 18.2444 13.0894 15.6669 15.6669C13.0894 18.2444 8.91056 18.2444 6.3331 15.6669C3.75563 13.0894 3.75563 8.91055 6.3331 6.3331C8.91056 3.75563 13.0894 3.75563 15.6669 6.33309ZM17.1302 16.1409C19.7722 12.9977 19.6144 8.30067 16.6569 5.34315C13.5327 2.21895 8.46734 2.21895 5.34315 5.34315C2.21895 8.46734 2.21895 13.5327 5.34315 16.6569C8.30046 19.6142 12.9971 19.7721 16.1402 17.1308L20.4045 21.3951C20.6778 21.6684 21.1211 21.6684 21.3944 21.3951C21.6678 21.1217 21.6678 20.6785 21.3944 20.4051L17.1302 16.1409Z"
      />
      <Path d="M15.6669 15.6669L16.1619 16.1619H16.1619L15.6669 15.6669ZM15.6669 6.33309L16.1619 5.83812L15.6669 6.33309ZM6.3331 15.6669L5.83812 16.1619L6.3331 15.6669ZM6.3331 6.3331L6.82807 6.82807L6.3331 6.3331ZM17.1302 16.1409L16.5943 15.6905L16.1813 16.1819L16.6352 16.6358L17.1302 16.1409ZM16.6569 5.34315L16.1619 5.83812V5.83812L16.6569 5.34315ZM5.34315 5.34315L5.83812 5.83812L5.34315 5.34315ZM5.34315 16.6569L5.83812 16.1619L5.34315 16.6569ZM16.1402 17.1308L16.6352 16.6358L16.1813 16.1819L15.6898 16.5949L16.1402 17.1308ZM20.4045 21.3951L20.8994 20.9001L20.4045 21.3951ZM21.3944 20.4051L20.8994 20.9001L20.8994 20.9001L21.3944 20.4051ZM16.1619 16.1619C19.0127 13.3111 19.0127 8.68895 16.1619 5.83812L15.1719 6.82807C17.476 9.13216 17.476 12.8678 15.1719 15.1719L16.1619 16.1619ZM5.83812 16.1619C8.68895 19.0127 13.3111 19.0127 16.1619 16.1619L15.1719 15.1719C12.8678 17.476 9.13216 17.476 6.82807 15.1719L5.83812 16.1619ZM5.83812 5.83812C2.98729 8.68895 2.98729 13.3111 5.83812 16.1619L6.82807 15.1719C4.52398 12.8678 4.52398 9.13216 6.82807 6.82807L5.83812 5.83812ZM16.1619 5.83812C13.3111 2.98729 8.68895 2.98729 5.83812 5.83812L6.82807 6.82807C9.13216 4.52398 12.8678 4.52398 15.1719 6.82807L16.1619 5.83812ZM17.666 16.5913C20.5396 13.1726 20.3684 8.06474 17.1518 4.84817L16.1619 5.83812C18.8604 8.5366 19.0047 12.8229 16.5943 15.6905L17.666 16.5913ZM17.1518 4.84817C13.7543 1.45061 8.24573 1.45061 4.84817 4.84817L5.83812 5.83812C8.68895 2.98729 13.3111 2.98729 16.1619 5.83812L17.1518 4.84817ZM4.84817 4.84817C1.45061 8.24573 1.45061 13.7543 4.84817 17.1518L5.83812 16.1619C2.98729 13.3111 2.98729 8.68895 5.83812 5.83812L4.84817 4.84817ZM4.84817 17.1518C8.06451 20.3682 13.1718 20.5396 16.5905 17.6667L15.6898 16.5949C12.8223 19.0046 8.5364 18.8602 5.83812 16.1619L4.84817 17.1518ZM20.8994 20.9001L16.6352 16.6358L15.6452 17.6257L19.9095 21.89L20.8994 20.9001ZM20.8994 20.9001L19.9095 21.89C20.4562 22.4368 21.3427 22.4368 21.8894 21.89L20.8994 20.9001ZM20.8994 20.9001L20.8994 20.9001L21.8894 21.89C22.4361 21.3433 22.4361 20.4569 21.8894 19.9101L20.8994 20.9001ZM16.6352 16.6358L20.8994 20.9001L21.8894 19.9101L17.6252 15.6459L16.6352 16.6358Z" />
    </Svg>
  );
};

const Svg = styled.svg`
  width: 24px;
  height: 24px;
  fill: none;
`;

const Path = styled.path`
  fill: #7b7b7b;
`;
