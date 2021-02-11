import * as React from 'react';
import styled from 'styled-components';
import logo from '../assets/svg/trov_logo_blue.svg';
import { Text } from './text';
import { Box } from './box';

const headerHeight = 6;

const LogoImg = styled.img`
  height: 4rem;
`;

const Header: React.FC = () => {
  return (
    <Box
      as="header"
      position="fixed"
      alignItems="center"
      height={`${headerHeight}rem`}
      width="100%"
      top="0"
      bg="white"
      boxShadow="0px 6px 8px 4px rgba(27, 155, 252, 0.06)"
    >
      <LogoImg src={logo} alt="logo" />
      <Text ml={3} fontWeight="bold" fontSize={[3]}>
        Incident Reporter
      </Text>
    </Box>
  );
};

const Main = styled.main`
  margin-top: ${headerHeight + 2}rem;
`;

export { Header, Main };
