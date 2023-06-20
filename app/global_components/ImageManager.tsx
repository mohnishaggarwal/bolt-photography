'use client';

import { useImagesContext } from '@/app/contexts/images/ImagesContext';
import ImageDislay from './ImageDisplay';
import NoImages from '../dashboard/library/NoImages';
import IImage from '../interfaces/image';

export default function ImageManager({ filter }: { filter: string }) {
  const { state } = useImagesContext();

  const filterImages = () => {
    let filteredImages: IImage[];
    switch (filter) {
      case 'library':
        filteredImages = state.images;
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

    return filteredImages.map((image) => image.file);
  };

  if (state.images.length == 0) {
    return <NoImages />;
  } else {
    return <ImageDislay images={filterImages()} />;
  }
}
