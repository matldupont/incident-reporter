import * as React from 'react';
import styled from 'styled-components';
import logo from '../assets/svg/trov_logo_blue.svg';

const StyledHeader = styled.header`
  position: fixed;
  height: 3rem;
`;

const Header = () => {
  return (
    <StyledHeader>
      <img src={logo} alt="logo" />
    </StyledHeader>
  );
};

export { Header };
