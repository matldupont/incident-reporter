import * as CSS from 'csstype';

export interface ThemeColors {
  blue: CSS.Property.Color;
  hoverBlue: CSS.Property.Color;
  lightBlue: CSS.Property.Color;
  border: CSS.Property.Color;
  background: CSS.Property.Color;
  white: CSS.Property.Color;
  grey: CSS.Property.Color;
  darkGrey: CSS.Property.Color;
  lightGrey: CSS.Property.Color;
  red: CSS.Property.Color;
  lightRed: CSS.Property.Color;
  green: CSS.Property.Color;
  lightGreen: CSS.Property.Color;
  focus: CSS.Property.Color;
}

export const colors: ThemeColors = {
  blue: '#005C99',
  hoverBlue: '#34adff',
  lightBlue: '#F5FBFF',
  border: '#E5E8E9',
  background: '#FAFDFF',
  white: '#FFFFFF',
  grey: '#F5F5F5',
  darkGrey: '#4B5658',
  lightGrey: '#e7e7e7',
  red: '#dc1919',
  lightRed: '#FFEEEE',
  green: '#467963',
  lightGreen: '#DBEDD6',
  focus: '#406198',
};
