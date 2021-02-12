import styled from 'styled-components';
import {
  flexbox,
  FlexboxProps,
  color,
  ColorProps,
  border,
  BorderProps,
  display,
  DisplayProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
  layout,
  LayoutProps,
  textStyle,
  TextStyleProps,
  system,
} from 'styled-system';

const textTransform = system({
  textTransform: true,
});

interface As {
  as?: React.ElementType;
}

export type TextProps = React.RefAttributes<HTMLElement> &
  React.HTMLAttributes<HTMLElement> &
  LayoutProps &
  ColorProps &
  SpaceProps &
  DisplayProps &
  FlexboxProps &
  TypographyProps &
  BorderProps &
  TextStyleProps &
  As;

export const Text: React.FC<TextProps> = styled.div`
  ${border}
  ${color}
  ${display}
  ${layout}
  ${space}
  ${typography}
  ${textStyle}
  ${textTransform}
  ${flexbox}
`;
