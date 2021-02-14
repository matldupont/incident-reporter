import * as React from 'react';
import styled from 'styled-components';

interface ErrorMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  showErrorMessage: boolean;
  id: string;
}

export const InputErrorMessage = styled.div<ErrorMessageProps>`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.red};
  opacity: 0;
  text-transform: none;
  transition: all 0.2s ease-in-out;
  font-weight: 400;
  flex-wrap: wrap;
  height: auto;
  margin-bottom: 0.4rem;
  display: flex;
  align-items: center;
  margin-top: ${({ theme }) => theme.space[1]};
  margin-bottom: ${({ theme }) => theme.space[2]};

  ${({ showErrorMessage }) => {
    return (
      showErrorMessage &&
      `

      max-height: 1000px;
      opacity: 1;
    `
    );
  }}

  &:empty {
    height: 0px;
  }
`;
