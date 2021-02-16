import * as React from 'react';
import styled from 'styled-components';
import trovLogo from '../assets/svg/trov_logo_blue.svg';
import trovIcon from '../assets/svg/trov_icon_blue.svg';
import plusIcon from '../assets/svg/plus.svg';
import { Text } from './text';
import { Box } from './box';
import { display } from 'styled-system';
import { Link } from 'react-router-dom';
import { Stack } from './stack';

const headerHeight = 6;

const LogoImg = styled.img`
  height: 4rem;
  ${display}
`;

const IconImg = styled.img`
  height: 3rem;
  ${display}
`;

const PlusImg = styled.img`
  color: blue;
  height: 3rem;
`;

const AddLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  align-self: stretch;
  background: none;
  border: none;
`;

const HomeLink = styled(Link)``;

export const Header: React.FC = () => {
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
      px={3}
    >
      <HomeLink to="/" aria-label="Back to the Incident List">
        <LogoImg display={['none', 'none', 'block']} src={trovLogo} alt="trov" />
        <IconImg display={['block', 'block', 'none']} src={trovIcon} alt="trov" />
      </HomeLink>
      <Text flex="1" ml={3} fontWeight="bold" fontSize={[3]}>
        Incident Reporter
      </Text>
      <AddLink to="/report" aria-label="Report an Incident">
        <PlusImg src={plusIcon} alt="trov" />
      </AddLink>
    </Box>
  );
};

export const Main: React.FC = ({ children }) => {
  return (
    <Stack
      bg="lightBlue"
      width="100vw"
      alignItems="center"
      as="main"
      position="absolute"
      bottom="0"
      height="calc(100% - 7rem)"
      overflow="scroll"
    >
      <Stack width="100vw" maxWidth={['100vw', '60rem']} position="absolute" bottom="0" height="100%">
        {children}
      </Stack>
    </Stack>
  );
};
