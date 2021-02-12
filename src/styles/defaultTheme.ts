import { Theme } from 'styled-system';
import { colors } from './colors';
import { space } from './space';
import { fontSizes, fontWeights } from './fonts';

const breakpoints: string[] = ['319px', '424px', '767px', '1023px'];

const radii = [0, '6px'];

const borders = ['none', `1px solid ${colors.border}`, `2px solid ${colors.border}`];

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
