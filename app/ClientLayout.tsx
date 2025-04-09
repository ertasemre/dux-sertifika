'use client';

import { MantineProvider, createTheme } from '@mantine/core';

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MantineProvider theme={theme}>
      {children}
    </MantineProvider>
  );
} 