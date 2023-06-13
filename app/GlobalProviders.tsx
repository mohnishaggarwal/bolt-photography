'use client';
import {ReactNode} from "react";
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
      main: '#7DF9FF',
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

export default function GlobalProviders({children}: IProps) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}


