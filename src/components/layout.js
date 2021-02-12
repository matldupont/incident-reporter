import * as React from 'react';
import styled from 'styled-components';
import trovLogo from '../assets/svg/trov_logo_blue.svg';
import trovIcon from '../assets/svg/trov_icon_blue.svg';
import plusIcon from '../assets/svg/plus.svg';
import { Text } from './text';
import { Box } from './box';
import { display } from 'styled-system';
import { Button } from './button';

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

const AddButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  align-self: stretch;
  background: none;
  border: none;
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
      px={3}
    >
      <LogoImg display={['none', 'none', 'block']} src={trovLogo} alt="trov" />
      <IconImg display={['block', 'block', 'none']} src={trovIcon} alt="trov" />
      <Text flex="1" ml={3} fontWeight="bold" fontSize={[3]}>
        Incident Reporter
      </Text>
      <AddButton onClick={() => console.log('HEY')}>
        <PlusImg src={plusIcon} alt="trov" />
      </AddButton>
    </Box>
  );
};

const Main = styled.main`
  margin-top: ${headerHeight + 2}rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 0;
  height: calc(100% - 8rem);
`;

export { Header, Main };
