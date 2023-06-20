'use client';

import { useEffect } from 'react';
import { useImagesContext } from '@/app/contexts/images/ImagesContext';
import ImageDislay from './ImageDisplay';
import NoImages from './NoImages';
import IImage from '../interfaces/image';

export default function ImageManager({ filter }: { filter: string }) {
  const { state } = useImagesContext();

  const filterImages = () => {
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

    return filteredImages;
  };

  if (state.images.length == 0) {
    return <NoImages filter={filter} />;
  } else {
    return <ImageDislay images={filterImages()} />;
  }
}
