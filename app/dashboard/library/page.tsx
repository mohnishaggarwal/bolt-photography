'use client';

import classNames from 'classnames';
import ImageManager from './ImageManager';
import { useImagesContext } from '@/app/contexts/images/ImagesContext';

export default function Library() {
  const { state } = useImagesContext();
  console.log(state);
  return (
    <div
      className={classNames('p-4 bg-base', {
        'h-fit': state.images.length > 0,
        'h-full': state.images.length == 0,
      })}
    >
      <ImageManager />
    </div>
  );
}
