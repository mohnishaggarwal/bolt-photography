'use client';

import { useImagesContext } from '@/app/contexts/images/ImagesContext';
import ImageDislay from './ImageDisplay';
import NoImages from './NoImages';

export default function ImageManager() {
  const { state } = useImagesContext();
  if (state.images.length == 0) {
    return <NoImages />;
  } else {
    return <ImageDislay images={state.images} />;
  }
}
