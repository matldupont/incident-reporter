import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './defaultTheme';

export const TrovThemeProvider: React.FC<React.ReactPropTypes> = ({ children }) => {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
};
