import * as React from 'react';
import { Box, BoxProps } from './box';

const Stack: React.FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <Box flexDirection="column" {...rest}>
      {children}
    </Box>
  );
};

Stack.displayName = 'Stack';

export { Stack };
