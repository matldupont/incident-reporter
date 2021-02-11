import * as React from 'react';
import styled from 'styled-components';
import logo from '../assets/svg/trov_logo_blue.svg';

const headerHeight = 6;

const StyledHeader = styled.header`
  position: fixed;
  display: flex;
  align-items: center;

  height: ${headerHeight}rem;
  width: 100%;
  top: 0%;
  background: #ffffff;
  box-shadow: 0px 6px 8px 4px rgba(27, 155, 252, 0.06);
`;

const LogoImg = styled.img`
  height: 4rem;
`;

const Header = () => {
  return (
    <StyledHeader>
      <LogoImg src={logo} alt="logo" />
      <div>Incident Reporter</div>
    </StyledHeader>
  );
};

const Main = styled.main`
  margin-top: ${headerHeight + 2}rem;
`;

export { Header, Main };
