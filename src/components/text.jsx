import styled from 'styled-components';
import { flexbox, color, border, display, space, system, typography, layout, textStyle } from 'styled-system';

const textTransform = system({
  textTransform: true,
});

export const Text = styled.div`
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
