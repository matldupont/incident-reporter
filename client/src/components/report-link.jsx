import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { margin, MarginProps, flexbox, FlexboxProps } from 'styled-system';

interface As {
  as?: React.ElementType;
}

export type TextProps = React.RefAttributes<HTMLElement> & React.HTMLAttributes<HTMLElement> & MarginProps & FlexboxProps & As;

export const ReportLink = styled(Link)`
  ${margin}
  ${flexbox}

  ${({ theme: { colors, radii, space, fontSizes } }) => ({
    background: colors.blue,
    borderRadius: radii[1],
    paddingTop: space[3],
    paddingBottom: space[3],
    paddingLeft: space[4],
    paddingRight: space[4],
    fontSize: fontSizes[2],
    color: colors.white,
  })}

  transition: all .3s;

  &:hover {
    ${({ theme: { colors } }) => ({
      background: colors.hoverBlue,
    })}
  }
`;
