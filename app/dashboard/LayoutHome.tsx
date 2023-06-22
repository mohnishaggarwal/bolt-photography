'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useMobileContext } from '../contexts/mobile/MobileContext';
import classNames from 'classnames';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileModal from '../global_components/modals/MobileModal';

export default function LayoutClient({ children }: { children: ReactNode }) {
  const { isSidebarVisible, isMobileScreen } = useMobileContext();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(isMobileScreen);
  }, [isMobileScreen]);

  return (
    <div className="bg-base text-white">
      {isSidebarVisible && <Sidebar />}
      <div
        className={classNames('relative h-screen', {
          'pl-72': isSidebarVisible,
        })}
      >
        <Header />
        <div className="p-4 pt-52 h-full">{children}</div>
      </div>
      <MobileModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
