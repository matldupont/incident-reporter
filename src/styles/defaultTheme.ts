import { Theme } from 'styled-system';
import { colors } from './colors';
import { space } from './space';
import { fontSizes, fontWeights } from './fonts';

const breakpoints: string[] = ['319px', '424px', '767px', '1023px'];

const radii = {
  none: 0,
  small: '1px',
  large: '2px',
};

const borders = ['none', `1px solid ${colors.border}`];

export const defaultTheme: Theme = {
  space: {
    ...space,
  },
  borders,
  breakpoints,
  colors: {
    ...colors,
  },
  fontSizes,
  fontWeights,
  radii,
};
