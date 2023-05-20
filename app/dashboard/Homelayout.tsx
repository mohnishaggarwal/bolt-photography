'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './Header';
import Sidebar from './Sidebar';
import Dropdown from '@/app/global_components/Dropdown';
import IconMenu from './IconMenu';

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

export default function Homelayout() {
  return (
    <ThemeProvider theme={theme}>
      <div className="fixed flex w-screen bg-base text-white h-screen">
        <Sidebar />
        <div className="w-screen h-screen">
          <Header />
          <hr className="border-1 w-full border-accent-100" />
          <div className="w-full px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex min-w-[180px] flex-col w-1/6 items-start">
                <h2 className="text-2xl mb-4">Your Treasures</h2>
                <Dropdown />
              </div>
              <IconMenu />
            </div>
          </div>
          <hr className="border-1 w-full border-accent-100" />
        </div>
      </div>
    </ThemeProvider>
  );
}
