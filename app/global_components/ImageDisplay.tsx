import IImage from '../interfaces/image';
import ImageCard from './ImageCard';

export default function ImageDislay({ images }: { images: IImage[] }) {
  return (
    <div className="h-full grid gap-8 grid-cols-1 lg:grid-cols-3 xl:grid-cols-6 grid-rows-2 z-50">
      {images.map((image, index) => (
        <ImageCard key={index} index={index} image={image} />
      ))}
    </div>
  );
}
