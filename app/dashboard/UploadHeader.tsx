'use client';

import IconMenu from './IconMenu';
import Dropdown from '@/app/global_components/Dropdown';
import { BsLayoutSidebarInset } from 'react-icons/bs';
import { BsLayoutSidebarInsetReverse } from 'react-icons/bs';
import { usePathname } from 'next/navigation';
import DeleteMenu from './DeleteMenu';
import { useSidebarContext } from '../contexts/sidebar/SidebarContext';

export default function UploadHeader() {
  const { showSidebar, handleSidebarToggle } = useSidebarContext();
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
            <div className="flex justify-center items-center  mb-4">
              <button
                onClick={handleSidebarToggle}
                className="hover:bg-accent-200 p-1 rounded-md"
              >
                {showSidebar ? (
                  <BsLayoutSidebarInset size={25} />
                ) : (
                  <BsLayoutSidebarInsetReverse size={25} />
                )}
              </button>
              <h2 className="text-2xl ml-2">{getTitle()}</h2>
            </div>
            <Dropdown />
          </div>
          {currentPath === 'trash' ? <DeleteMenu /> : <IconMenu />}
        </div>
      </div>
      <hr className="border-1 w-full border-accent-100" />
    </>
  );
}
