'use client';

import classNames from 'classnames';
import ImageManager from '../../global_components/ImageManager';
import { useImagesContext } from '@/app/contexts/images/ImagesContext';

export default function Library() {
  const { state } = useImagesContext();
  console.log(state);
  return <ImageManager filter={'library'} />;
}
