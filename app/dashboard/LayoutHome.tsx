'use client';

import { ReactNode, useState } from 'react';
import { useSidebarContext } from '../contexts/sidebar/SidebarContext';
import classNames from 'classnames';
import Header from './Header';
import Sidebar from './Sidebar';

export default function LayoutClient({ children }: { children: ReactNode }) {
  const { showSidebar } = useSidebarContext();
  console.log(showSidebar);

  return (
    <div className="bg-base text-white">
      {showSidebar && <Sidebar />}
      <div
        className={classNames('relative h-screen', { 'pl-72': showSidebar })}
      >
        <Header />
        <div className="p-4 pt-52 h-full">{children}</div>
      </div>
    </div>
  );
}
