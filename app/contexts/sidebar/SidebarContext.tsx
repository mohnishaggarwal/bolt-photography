import { createContext, useContext } from 'react';

interface ISidebarContext {
  showSidebar: boolean;
  handleSidebarToggle: () => void;
}

export const SidebarContext = createContext<ISidebarContext>({
  showSidebar: true,
  handleSidebarToggle: () => {},
});

export const useSidebarContext = () => useContext(SidebarContext);
