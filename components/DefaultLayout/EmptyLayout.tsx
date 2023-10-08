import { Box } from '@mantine/core';
import React from 'react';

export const EmptyLayout = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ minHeight: '100vh' }}>{children}</Box>
);
