import { createGlobalStyle } from 'styled-components';
import styledNormalize from 'styled-normalize';
import reset from 'styled-reset';
// import { theme } from './theme';

// const { fonts } = theme;

import GalanoLightWoff from '../assets/fonts/light.woff';
import GalanoLightWoff2 from '../assets/fonts/light.woff2';
import GalanoRegularWoff from '../assets/fonts/regular.woff';
import GalanoRegularWoff2 from '../assets/fonts/regular.woff2';
import GalanoMediumWoff from '../assets/fonts/medium.woff';
import GalanoMediumWoff2 from '../assets/fonts/medium.woff2';

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}
  ${reset}


  @font-face {
    font-family: 'Galano Grotesque';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('Galano Grotesque'), local('GalanoGrotesque'),
    url(${GalanoRegularWoff2}) format("woff2"),
    url(${GalanoRegularWoff}) format("woff")
  }

  @font-face {
    font-family: 'Galano Grotesque';
    font-style: normal;
    font-weight: 200;
    font-display: swap;
    src: local('Galano Grotesque'), local('GalanoGrotesque'),
    url(${GalanoLightWoff2}) format("woff2"), 
    url(${GalanoLightWoff}) format("woff")
  }

  @font-face {
    font-family: 'Galano Grotesque';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: local('Galano Grotesque'), local('GalanoGrotesque'),
    url(${GalanoMediumWoff2}) format("woff2"), 
    url(${GalanoMediumWoff}) format("woff")
  }


  html {
    font-size: 62.5%;
    -webkit-font-smoothing: antialiased;
  }

  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  a {
    text-decoration: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
    border: 0;
  }

  body {
    background: #FAFDFF;
    font-size: 1.6rem;
    box-sizing: border-box;
    font-family: 'Galano Grotesque';
  }
`;

export { GlobalStyle };
