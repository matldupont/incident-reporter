import * as React from 'react';
import { Box, BoxProps } from './box';
import type {} from 'styled-components/cssprop';

const Stack: React.FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <Box flexDirection="column" {...rest}>
      {children}
    </Box>
  );
};

Stack.displayName = 'Stack';

export { Stack };
