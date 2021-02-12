import * as React from 'react';
import styled from 'styled-components';
import { space, layout, alignSelf, position } from 'styled-system';

type ButtonProps = {
  ariaLabel: string;
  as?: string;
  children: React.ReactChild;
  disabled?: boolean;
  display?: string;
  id: string;
  onClick(): void;
  title?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const StyledButton = styled.button<ButtonProps>`
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }

  ${space}
  ${layout}
  ${position}
  ${alignSelf}
`;

export const Button: React.FC<ButtonProps> = ({ id, onClick, children, ariaLabel, title, ...rest }) => {
  const handleButtonClick = (event: Event) => {
    event.preventDefault();
    onClick();
  };

  return (
    <StyledButton aria-label={ariaLabel} data-testid={id} onClick={handleButtonClick} title={title || ariaLabel} type="button" {...rest}>
      {children}
    </StyledButton>
  );
};
