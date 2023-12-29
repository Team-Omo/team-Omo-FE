import React from 'react';
import styled from 'styled-components';

const LocationIcon = () => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
      <path
        d="M15.4648 6.3375C14.6773 2.8725 11.6548 1.3125 8.99983 1.3125C8.99983 1.3125 8.99983 1.3125 8.99233 1.3125C6.34483 1.3125 3.31483 2.865 2.52733 6.33C1.64983 10.2 4.01983 13.4775 6.16483 15.54C6.95983 16.305 7.97983 16.6875 8.99983 16.6875C10.0198 16.6875 11.0398 16.305 11.8273 15.54C13.9723 13.4775 16.3423 10.2075 15.4648 6.3375ZM8.99983 10.095C7.69483 10.095 6.63733 9.0375 6.63733 7.7325C6.63733 6.4275 7.69483 5.37 8.99983 5.37C10.3048 5.37 11.3623 6.4275 11.3623 7.7325C11.3623 9.0375 10.3048 10.095 8.99983 10.095Z"
        fill="#44A5FF"
      />
    </Svg>
  );
};

export default LocationIcon;

const Svg = styled.svg`
  width: 18px;
  height: 18px;
  fill: none;
`;
