'use client';

import { useEffect, useState } from 'react';
import { useImagesContext } from '@/app/contexts/images/ImagesContext';
import ImageDislay from './ImageDisplay';
import NoImages from './NoImages';
import IImage from '../interfaces/image';

export default function ImageManager({ filter }: { filter: string }) {
  const { state } = useImagesContext();
  const [images, setImages] = useState<IImage[]>([]);

  useEffect(() => {
    let filteredImages: IImage[];
    switch (filter) {
      case 'library':
        filteredImages = state.images;
        break;
      case 'favorites':
        filteredImages = state.favoritedImages;
        break;
      case 'recently-added':
        filteredImages = state.images.sort((imgA, imgB) => imgB.uploadTime - imgA.uploadTime);
        break;
      case 'hidden':
        filteredImages = state.hiddenImages;
        break;
      case 'trash':
        filteredImages = state.trashedImages;
        break;
      default:
        throw new Error("filter property doesn't exist");
    }
    setImages(filteredImages);
  }, [state]);

  if (images.length == 0) {
    return (
      <div className="h-full">
        <NoImages filter={filter} />
      </div>
    );
  } else {
    return (
      <div className="h-fit">
        <ImageDislay images={images} />
      </div>
    );
  }
}
