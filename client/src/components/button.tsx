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
  transition: all 0.3s;

  ${({ theme: { colors, radii, space, fontSizes } }) => ({
    background: colors.blue,
    borderRadius: radii[1],
    paddingTop: space[3],
    paddingBottom: space[3],
    paddingLeft: space[4],
    paddingRight: space[4],
    fontSize: fontSizes[2],
    color: colors.white,
  })}
  border: none;

  &:focus {
    border-color: transparent;
    outline: ${({ theme }) => theme.colors.focus};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.focus};
  }

  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.colors.hoverBlue};
  }

  ${space}
  ${layout}
  ${position}
  ${alignSelf}
`;

export const Button: React.FC<ButtonProps> = ({ id, onClick, children, ariaLabel, title, ...rest }) => {
  const handleButtonClick = (event: Event) => {
    if (onClick) {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <StyledButton aria-label={ariaLabel} data-testid={id} onClick={handleButtonClick} title={title || ariaLabel} type="button" {...rest}>
      {children}
    </StyledButton>
  );
};
