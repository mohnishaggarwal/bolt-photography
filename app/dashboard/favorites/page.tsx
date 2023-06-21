'use client';

import ImageManager from '../../global_components/ImageManager';
import { useImagesContext } from '@/app/contexts/images/ImagesContext';

export default function Favorites() {
  const { state } = useImagesContext();
  return <ImageManager filter={'favorites'} />;
}
