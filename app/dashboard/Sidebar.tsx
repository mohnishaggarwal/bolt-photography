'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import SidebarItem from './SidebarItem';
import UsageDisplay from './UsageDisplay';
import UploadButton from './UploadButton';
import { useImagesContext } from '../contexts/images/ImagesContext';
import FeatureInProgressModal from '../global_components/modals/FeatureInProgressModal';

export default function Sidebar() {
  let MenuOptions = [
    { name: 'Library', selected: false },
    { name: 'Favorites', selected: false },
    { name: 'Recently Added', selected: false },
    { name: 'Hidden', selected: false },
    { name: 'Trash', selected: false },
  ];

  const [menuItems, setMenuItems] = useState(MenuOptions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { dispatch } = useImagesContext();

  const setMenuOptions = () => {
    const pathname = usePathname();
    const currentPath = pathname.split('/').pop() || '';
    let searchTarget: string;
    switch (currentPath) {
      case 'library':
        searchTarget = 'Library';
        break;
      case 'favorites':
        searchTarget = 'Favorites';
        break;
      case 'recently-added':
        searchTarget = 'Recently Added';
        break;
      case 'hidden':
        searchTarget = 'Hidden';
        break;
      case 'trash':
        searchTarget = 'Trash';
        break;
      default:
        throw new Error('Pathname does not exist');
    }
    const index = MenuOptions.findIndex(
      (option) => option.name === searchTarget
    );
    MenuOptions[index].selected = true;
  };

  function handleMenuSelection(menuItem: string) {
    if (menuItem === 'Hidden') {
      setIsModalOpen(true);
      return;
    }

    dispatch({ type: 'RESET_SELECTED' });
    const updatedMenuItems = menuItems.map((option) => {
      return {
        ...option,
        selected: option.name === menuItem,
      };
    });
    setMenuItems(updatedMenuItems);

    switch (menuItem) {
      case 'Library':
        router.push('dashboard/library');
        break;
      case 'Favorites':
        router.push('dashboard/favorites');
        break;
      case 'Recently Added':
        router.push('dashboard/recently-added');
        break;
      case 'Hidden':
        break;
      case 'Trash':
        router.push('dashboard/trash');
        break;
      default:
        throw new Error('Menu selection property does not exist');
    }
  }

  setMenuOptions();

  return (
    <div className="w-72 bg-accent-100 h-screen fixed z-10">
      <div className="w-full flex flex-col">
        <div className="flex justify-center items-center h-48">
          <UploadButton />
        </div>
        {menuItems.map((menuItem, index) => (
          <SidebarItem
            name={menuItem.name}
            selected={menuItem.selected}
            changeSelection={handleMenuSelection}
            key={index}
          />
        ))}
        <hr className="my-4 border-accent-300" />
        <UsageDisplay />
        <FeatureInProgressModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
}
