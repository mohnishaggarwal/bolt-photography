'use client';

import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './Header';
import Sidebar from './Sidebar';
import classNames from 'classnames';

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

export default function Homelayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <div className="flex w-screen text-white h-screen">
        <Sidebar />
        <div
          className={classNames(
            `w-screen h-screen bg-base transition-all duration-300`
          )}
        >
          <Header />
          <hr className="border-1 w-full border-accent-300" />
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
}
