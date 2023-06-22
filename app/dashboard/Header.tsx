'use client';

import AppHeader from './AppHeader';
import UploadHeader from './UploadHeader';
import classNames from 'classnames';
import { useMobileContext } from '../contexts/mobile/MobileContext';

export default function Header() {
  const { isSidebarVisible } = useMobileContext();
  return (
    <div
      className={classNames('fixed h-52 top-0 z-10 right-0 bg-base', {
        'w-[calc(100%-18rem)]': isSidebarVisible,
        'w-full': !isSidebarVisible,
      })}
    >
      <AppHeader />
      <UploadHeader />
    </div>
  );
}
