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
  red: CSS.Property.Color;
  focus: CSS.Property.Color;
}

export const colors: ThemeColors = {
  blue: '#0198FF',
  hoverBlue: '#34adff',
  lightBlue: '#F5FBFF',
  border: '#E5E8E9',
  background: '#FAFDFF',
  white: '#FFFFFF',
  grey: '#F5F5F5',
  darkGrey: '#929EA2',
  red: '#dc1919',
  focus: '#406198',
};
