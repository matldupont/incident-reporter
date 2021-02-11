import * as React from 'react';
import { Box } from './box';

const Stack: React.FC = ({ children, ...rest }) => {
  return (
    <Box flexDirection="column" {...rest}>
      {children}
    </Box>
  );
};

Stack.displayName = 'Stack';

export { Stack };
