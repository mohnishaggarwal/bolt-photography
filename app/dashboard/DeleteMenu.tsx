import React from 'react';

export default function DeleteMenu() {
  return (
    <div className="flex justify-between w-64 text-accent-400">
      <button className="hover:bg-accent-100 p-2 rounded-md">Recover</button>
      <button className="hover:bg-accent-100 p-2 rounded-md">Delete</button>
      <button className="hover:bg-accent-100 p-2 rounded-md">Delete All</button>
    </div>
  );
}
