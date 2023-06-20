'use client';

import AppHeader from './AppHeader';
import UploadHeader from './UploadHeader';

export default function Header() {
  return (
    <div className="fixed w-[calc(100%-18rem)] h-52 z-10 top-0 right-0 bg-base">
      <AppHeader />
      <UploadHeader />
    </div>
  );
}
