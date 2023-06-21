'use client';

import Image from 'next/image';

export default function NoImages({ filter }: { filter: string }) {
  const getHeader = () => {
    switch (filter) {
      case 'library':
        return 'No uploads - yet!';
      case 'favorites':
        return 'No favorites 😔';
      case 'recently-added':
        return 'No uploads - yet!';
      case 'hidden':
        return '';
      case 'trash':
        return 'No trash 😌';
      default:
        throw new Error('filter option does not exist');
    }
  };

  const getText = () => {
    switch (filter) {
      case 'library':
        return "Looks like you haven't added an upload, no worries. click the Add New button to add your first upload!";
      case 'favorites':
        return 'No favorites over here! Try favoriting an image from your library to see some images here';
      case 'recently-added':
        return "Looks like you haven't added an upload, no worries. click the Add New button to add your first upload!";
      case 'hidden':
        return '';
      case 'trash':
        return 'When you delete an image, it will show up over here!';
      default:
        throw new Error('filter option does not exist');
    }
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="w-3/12 flex flex-col justify-center items-center">
        <Image
          src="/images/not_found_other.svg"
          alt="Not found image"
          width={150}
          height={150}
          className="object-contain"
        />
        <h2 className="text-2xl mb-2 font-bold">{getHeader()}</h2>
        <center className="text-sm text-accent-400">{getText()}</center>
      </div>
    </div>
  );
}
