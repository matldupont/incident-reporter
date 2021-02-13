import { remify } from './utils';

const fontSizes = [12, 14, 16, 20, 24, 32, 48, 64, 96].map(remify);

const fontWeights = {
  light: 299,
  regular: 400,
  bold: 500,
};

export { fontSizes, fontWeights };
