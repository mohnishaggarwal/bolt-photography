'use client';

import classNames from 'classnames';
import { MouseEvent, SyntheticEvent, useState, useEffect } from 'react';
import { useImagesContext } from '@/app/contexts/images/ImagesContext';
import IImage from '@/app/interfaces/image';
import { useMobileContext } from '../contexts/mobile/MobileContext';

export default function ImageCard({
  index,
  image,
}: {
  index: number;
  image: IImage;
}) {
  const [textLeft, setTextLeft] = useState(0);
  const [spanMultiple, setSpanMultiple] = useState(false);
  const { state, dispatch } = useImagesContext();
  const { isMobileScreen } = useMobileContext();
  const [isSelected, setIsSelected] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getTextLeft = (
    height: number,
    width: number,
    naturalWidth: number,
    naturalHeight: number
  ) => {
    const trueWidth = (naturalWidth * height) / naturalHeight;
    return Math.round(width / 2 - trueWidth / 2);
  };

  const handleImageLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    const { height, width, naturalWidth, naturalHeight } = event.currentTarget;
    setTextLeft(getTextLeft(height, width, naturalWidth, naturalHeight));
    setSpanMultiple(naturalWidth > naturalHeight);
  };

  const handleClick = (event: MouseEvent<HTMLLabelElement>) => {
    if (isSelected) {
      setIsSelected(false);
      dispatch({ type: 'REMOVE_FROM_SELECTED', payload: image });
    } else {
      if (event.metaKey || event.ctrlKey) {
        dispatch({ type: 'ADD_TO_SELECTED', payload: image });
      } else {
        dispatch({ type: 'SET_SELECTED', payload: image });
      }
      setIsSelected(true);
    }
  };

  useEffect(() => {
    const isSelected = state.selectedImages.find(
      (selectedImage: IImage) => image.file === selectedImage.file
    );
    setIsSelected(isSelected !== undefined);
  }, [state.selectedImages]);

  const getTagsString = () => {
    return image.tags.map((tag) => `#${tag}`).join(' ');
  };

  return (
    <label
      className={classNames(
        'relative w-full bg-accent-100 rounded-lg p-4 h-fit hover:cursor-pointer hover:bg-accent-200',
        { 'border-highlight border-2': isSelected }
      )}
      onClick={handleClick}
      style={{
        gridColumn: spanMultiple && !isMobileScreen ? 'span 2 / span 2' : '',
      }}
    >
      <img
        src={URL.createObjectURL(image.file)}
        alt={`Uploaded Image ${index + 1}`}
        className="w-full h-full object-contain rounded-md"
        onLoad={handleImageLoad}
      />
      <div
        style={{ marginLeft: textLeft }}
        className={classNames('mt-1 truncate')}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <p
          className={classNames('text-sm', {
            'whitespace-normal overflow-visible': isHovered,
          })}
        >
          {image.file.name}
        </p>
        <p
          className={classNames('text-sm text-highlight', {
            'whitespace-normal overflow-visible': isHovered,
          })}
        >
          {image.tags.length > 0 ? getTagsString() : 'generating tags...'}
        </p>
      </div>
    </label>
  );
}
