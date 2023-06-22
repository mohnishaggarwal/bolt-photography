'use client';

import { ReactNode, useState } from 'react';
import { SidebarContext } from './SidebarContext';

export default function SidebarContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [showSidebar, setShowSidebar] = useState(true);
  const handleSidebarToggle: () => void = () => {
    setShowSidebar(!showSidebar);
  };
  console.log(showSidebar);
  return (
    <SidebarContext.Provider value={{ showSidebar, handleSidebarToggle }}>
      {children}
    </SidebarContext.Provider>
  );
}
