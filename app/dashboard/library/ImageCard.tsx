'use client';

import classNames from 'classnames';
import { SyntheticEvent, useState } from 'react';

export default function ImageCard({
  index,
  image,
}: {
  index: number;
  image: File;
}) {
  const [textTop, setTextTop] = useState(0);
  const [textLeft, setTextLeft] = useState(0);
  const [spanMultiple, setSpanMultiple] = useState(false);

  const getTextTop = (
    height: number,
    width: number,
    naturalWidth: number,
    naturalHeight: number
  ) => {
    if (naturalHeight > naturalWidth) {
      return height;
    }
    const trueHeight = (naturalHeight * width) / naturalWidth;
    return Math.round(height / 2 + trueHeight / 2);
  };

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
    setTextTop(getTextTop(height, width, naturalWidth, naturalHeight));
    setTextLeft(getTextLeft(height, width, naturalWidth, naturalHeight));
    setSpanMultiple(naturalWidth > naturalHeight);
  };
  return (
    <div
      className={classNames(
        'relative w-full bg-accent-100 rounded-lg p-4 h-fit ',
        { 'border-highlight border-2': index == 0 }
      )}
      style={{ gridColumn: spanMultiple ? 'span 2 / span 2' : '' }}
    >
      <>
        <img
          src={URL.createObjectURL(image)}
          alt={`Uploaded Image ${index + 1}`}
          className="w-full h-full object-contain rounded-md"
          onLoad={handleImageLoad}
        />
        <div style={{ marginLeft: textLeft }}>
          <p className="text-sm">{image.name}</p>
          <p className="text-sm text-highlight">generating tags...</p>
        </div>
      </>
    </div>
  );
}
