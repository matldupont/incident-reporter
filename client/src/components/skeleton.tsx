import React from 'react';
import {
  space,
  SpaceProps,
  color,
  ColorProps,
  layout,
  LayoutProps,
  flexbox,
  FlexboxProps,
  position,
  PositionProps,
  border,
  BorderProps,
  shadow,
  ShadowProps,
} from 'styled-system';
import styled from 'styled-components';
import { animations } from '../styles/animations';
import { colors } from '../styles/colors';

interface As {
  as?: React.ElementType;
}

export type BoxProps = React.RefAttributes<HTMLElement> &
  React.HTMLAttributes<HTMLElement> &
  LayoutProps &
  ColorProps &
  SpaceProps &
  PositionProps &
  FlexboxProps &
  ShadowProps &
  BorderProps &
  As;

const SkeletonBlock: React.FC<BoxProps> = styled.div`
  ${border}
  ${color}
  ${flexbox}
  ${layout}
  ${position}
  ${space}
  ${shadow}

  background: linear-gradient(
    to right,
    ${colors.lightGrey} 20%,
    ${colors.white} 40%,
    ${colors.white} 60%,
    ${colors.lightGrey} 80%
  );
  background-size: 200% auto;
  content: '';
  animation: ${animations.shine} 0.8s linear infinite;
  border-radius: 6px;
  width: 100%;
`;

type SkeletonProps = {
  height: string;
};

export const Skeleton: React.FC<SkeletonProps> = (props) => <SkeletonBlock {...props} />;
