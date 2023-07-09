import React from 'react';
import { Box } from './Box/Box';

type SpacerProps = {
  mode?: 'vertical' | 'horizontal';
  size?: number;
};
export const Spacer = (props: SpacerProps) => {
  const { mode = 'vertical', size = 24 } = props;
  return (
    <Box
      style={{
        height: mode === 'vertical' ? size : undefined,
        width: mode === 'horizontal' ? size : undefined,
      }}
    />
  );
};
