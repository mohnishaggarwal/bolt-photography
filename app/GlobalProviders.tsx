'use client';
import { ReactNode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

interface IProps {
  children: ReactNode;
}

const theme = createTheme({
  palette: {
    primary: {
      light: '#BFB7B7',
      main: '#544D4D',
      dark: '#343131',
    },
    secondary: {
      main: '#c7a8f0',
    },
    info: {
      main: '#FFFFFF',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
    fontFamily: '--font-inter',
  },
});

export default function GlobalProviders({ children }: IProps) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
