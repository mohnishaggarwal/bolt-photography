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
        filteredImages = state.images.filter((image) => !image.trash);
        break;
      case 'favorites':
        filteredImages = state.images.filter(
          (image) => image.favorite === true
        );
        break;
      case 'recently-added':
        filteredImages = state.images.filter(
          (image) => image.recentlyAdded === true
        );
        filteredImages.sort(
          (img1, img2) => img1.uploadTime.getTime() - img2.uploadTime.getTime()
        );
        break;
      case 'hidden':
        filteredImages = state.images.filter((image) => image.hidden === true);
        break;
      case 'trash':
        filteredImages = state.images.filter((image) => image.trash === true);
        break;
      default:
        throw new Error("filter property doesn't exist");
    }
    setImages(filteredImages);
  }, [state.images]);

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
