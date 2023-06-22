'use client';

import AppHeader from './AppHeader';
import UploadHeader from './UploadHeader';
import classNames from 'classnames';
import { useSidebarContext } from '../contexts/sidebar/SidebarContext';

export default function Header() {
  const { showSidebar } = useSidebarContext();
  return (
    <div
      className={classNames('fixed h-52 z-10 top-0 right-0 bg-base', {
        'w-[calc(100%-18rem)]': showSidebar,
        'w-full': !showSidebar,
      })}
    >
      <AppHeader />
      <UploadHeader />
    </div>
  );
}
