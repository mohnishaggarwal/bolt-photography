'use client';

import Image from 'next/image';

export default function NoImages() {
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
        <h2 className="text-2xl mb-2 font-bold">No uploads - yet!</h2>
        <center className="text-sm text-accent-400">
          Looks like you haven't added an upload, no worries. click the Add New
          button to add your first upload!
        </center>
      </div>
    </div>
  );
}
