'use client';

import { ReactNode, useState, useEffect } from 'react';
import { MobileContext } from './MobileContext';

const MOBILE_VIEWPORT_WIDTH = 770;

export default function SidebarContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const handleSidebarToggle: () => void = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${MOBILE_VIEWPORT_WIDTH}px)`
    );

    const handleResize = (event: MediaQueryListEvent) => {
      setIsMobileScreen(event.matches);
      setIsSidebarVisible(!event.matches);
    };

    setIsMobileScreen(mediaQuery.matches);
    setIsSidebarVisible(!mediaQuery.matches);

    mediaQuery.addEventListener('change', handleResize);

    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  return (
    <MobileContext.Provider
      value={{ isSidebarVisible, handleSidebarToggle, isMobileScreen }}
    >
      {children}
    </MobileContext.Provider>
  );
}
