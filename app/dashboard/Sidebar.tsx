'use client';

import { useState } from 'react';
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

  function handleMenuSelection(menuItem: string) {
    const updatedMenuItems = menuItems.map((option) => {
      return {
        ...option,
        selected: option.name === menuItem,
      };
    });
    setMenuItems(updatedMenuItems);
  }

  return (
    <div className="w-1/4 min-w-[300px] bg-accent-100 h-screen">
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
