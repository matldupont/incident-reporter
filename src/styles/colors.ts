import * as CSS from 'csstype';

export interface ThemeColors {
  blue: CSS.Property.Color;
  hoverBlue: CSS.Property.Color;
  border: CSS.Property.Color;
  background: CSS.Property.Color;
  white: CSS.Property.Color;
  grey: CSS.Property.Color;
}

export const colors: ThemeColors = {
  blue: '#0198FF',
  hoverBlue: '',
  border: '#E5E8E9',
  background: '#FAFDFF',
  white: '#FFFFFF',
  grey: '#F5F5F5',
};
