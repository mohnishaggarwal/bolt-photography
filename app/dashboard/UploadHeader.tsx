'use client';

import IconMenu from './IconMenu';
import Dropdown from '@/app/global_components/Dropdown';
import { usePathname } from 'next/navigation';
import DeleteMenu from './DeleteMenu';

export default function UploadHeader() {
  const pathname = usePathname();
  const currentPath = pathname.split('/').pop() || '';

  const getTitle = () => {
    switch (currentPath) {
      case 'library':
        return 'Your Uploads';
      case 'favorites':
        return 'Favorites';
      case 'recently-added':
        return 'Recently Added Uploads';
      case 'hidden':
        return 'Hidden Uploads';
      case 'trash':
        return 'Recently Deleted Uploads';
      default:
        throw new Error('path does not exist');
    }
  };

  return (
    <>
      <div className="w-full px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex min-w-[180px] flex-col items-start">
            <h2 className="text-2xl mb-4">{getTitle()}</h2>
            <Dropdown />
          </div>
          {currentPath === 'trash' ? <DeleteMenu /> : <IconMenu />}
        </div>
      </div>
      <hr className="border-1 w-full border-accent-100" />
    </>
  );
}
