'use client';

import React from 'react';
import { useImagesContext } from '../contexts/images/ImagesContext';

export default function DeleteMenu() {
  const { dispatch } = useImagesContext();

  const handleRecover = () => {
    dispatch({ type: 'RECOVER_IMAGES' });
  };

  return (
    <div className="flex justify-between w-64 text-accent-400">
      <button
        className="hover:bg-accent-100 p-2 rounded-md"
        onClick={handleRecover}
      >
        Recover
      </button>
      <button className="hover:bg-accent-100 p-2 rounded-md">Delete</button>
      <button className="hover:bg-accent-100 p-2 rounded-md">Delete All</button>
    </div>
  );
}
