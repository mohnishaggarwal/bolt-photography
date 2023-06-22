import { createContext, useContext } from 'react';

interface IMobileContext {
  isSidebarVisible: boolean;
  handleSidebarToggle: () => void;
  isMobileScreen: boolean;
}

export const MobileContext = createContext<IMobileContext>({
  isSidebarVisible: true,
  handleSidebarToggle: () => {},
  isMobileScreen: false,
});

export const useMobileContext = () => useContext(MobileContext);
