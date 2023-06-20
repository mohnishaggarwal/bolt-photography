'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SidebarItem from './SidebarItem';
import UsageDisplay from './UsageDisplay';
import UploadButton from './UploadButton';

const MenuOptions = [
  { name: 'Library', selected: true },
  { name: 'Favorites', selected: false },
  { name: 'Recently Added', selected: false },
  { name: 'Hidden', selected: false },
  { name: 'Trash', selected: false },
];

export default function Sidebar() {
  const [menuItems, setMenuItems] = useState(MenuOptions);
  const router = useRouter();

  function handleMenuSelection(menuItem: string) {
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
    console.log(menuItem);
  }

  return (
    <div className="w-72 z-20 bg-accent-100 h-screen fixed">
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
      </div>
    </div>
  );
}
