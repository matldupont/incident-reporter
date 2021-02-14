import React from 'react';
import styled, { keyframes } from 'styled-components';
import { space } from 'styled-system';

type SpinnerProps = {
  size?: string;
  stroke?: string;
};

const spinnerAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.div<SpinnerProps>`
  ${space}
  &,
  &:after {
    border-radius: 50%;
    width: ${({ size }) => size};
    height: ${({ size }) => size};
  }

  position: relative;
  text-indent: -9999em;
  border-top: ${({ stroke }) => stroke} solid ${({ theme }) => theme.colors.white}33;
  border-right: ${({ stroke }) => stroke} solid ${({ theme }) => theme.colors.white}33;
  border-bottom: ${({ stroke }) => stroke} solid ${({ theme }) => theme.colors.white}33;
  border-left: ${({ stroke }) => stroke} solid ${({ theme }) => theme.colors.white};
  transform: translateZ(0);
  animation: ${spinnerAnimation} 1.1s infinite linear;
`;
const Spinner: React.FC<SpinnerProps> = ({ size = '5rem', stroke = '.3rem', ...rest }) => {
  return (
    <StyledSpinner aria-live="assertive" role="alert" size={size} stroke={stroke} {...rest}>
      Loading...
    </StyledSpinner>
  );
};

export default Spinner;
