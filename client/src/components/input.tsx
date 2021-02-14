import * as React from 'react';
import { Box } from './box';
import { Text } from './text';
import styled from 'styled-components';
import { layout, LayoutProps, margin, MarginProps, flexbox, FlexboxProps } from 'styled-system';
import { InputErrorMessage } from './input-error-message';

type InputProps = {
  ariaLabel: string;
  errorMessage: string;
  hasError: boolean;
  hint: string;
  as?: string;
  children: React.ReactChild;
  disabled?: boolean;
  display?: string;
  id: string;
  label: string;
  onClick(): void;
  onBlur(): void;
  onChange(e: KeyboardEvent): void;
  onKeyPress(e: KeyboardEvent): void;
  title?: string;
  rows: number;
  textarea: boolean;
} & React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;

// const defaultProps = {
//   ariaLabel: '',
//   autoComplete: 'on',
//   disabled: false,
//   errorMessage: '',
//   hasError: false,
//   hint: null,
//   icon: '',
//   isLoading: false,
//   label: '',
//   max: null,
//   maxLength: null,
//   min: null,
//   name: '',
//   onBlur: () => {},
//   onChange: () => {},
//   onKeyPress: () => {},
//   required: false,
//   rows: 5,
//   suffix: '',
//   systemProps: {},
//   textarea: false,
//   type: 'text',
//   value: '',
// };

export type ContainerProps = React.RefAttributes<HTMLElement> &
  React.HTMLAttributes<HTMLElement> &
  LayoutProps &
  MarginProps &
  FlexboxProps;

export const InputContainer: React.FC<ContainerProps> = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;

  ${layout}
  ${margin}
  ${flexbox}

  input {
    height: 34px;
  }

  input,
  textarea {
    width: 100%;
    padding: ${({ theme }) => theme.space[2]};
    box-sizing: border-box;
    font-size: 1.6rem;
    border: ${({ theme }) => theme.borders[3]};

    border-radius: ${({ theme }) => theme.radii[1]};

    transition: all 0.2s;

    &[aria-invalid='true'] {
      border: ${({ theme }) => theme.borders[4]};
      position: relative;
    }

    &:focus {
      outline: ${({ theme }) => theme.colors.focus};
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.focus};
    }
  }
`;

const Input: React.FC<InputProps> = ({
  ariaLabel,
  errorMessage,
  hasError,
  hint,
  id,
  label,
  max,
  maxLength,
  min,
  name,
  onBlur,
  onChange,
  required,
  rows,
  textarea,
  type,
  value,
  disabled,
  ...rest
}) => {
  const getInput = () => {
    return (
      <input
        aria-invalid={hasError}
        aria-label={ariaLabel}
        aria-required={required}
        id={id}
        max={max}
        maxLength={maxLength}
        min={min}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        required={required}
        type={type}
        value={value}
      />
    );
  };

  const getTextArea = () => {
    return (
      <textarea aria-invalid={hasError} disabled={disabled} id={id} onChange={onChange} required={required} rows={rows} value={value} />
    );
  };

  const getInputType = () => {
    if (textarea) return getTextArea();

    return getInput();
  };

  return (
    <InputContainer {...rest}>
      <Text display="flex" flexDirection="column" fontWeight="bold" htmlFor={id}>
        <Text as="label" fontSize={1} htmlFor={id}>
          {label}
          {hint && (
            <Text fontWeight="regular" mb={1}>
              {hint}
            </Text>
          )}
        </Text>

        {hasError && (
          <InputErrorMessage aria-live="assertive" id={`${id}-error`} role="alert" showErrorMessage={hasError}>
            {errorMessage}
          </InputErrorMessage>
        )}
        <Box position="relative" mt={1}>
          {getInputType()}
        </Box>
      </Text>
    </InputContainer>
  );
};

Input.displayName = 'Input';

export { Input };
