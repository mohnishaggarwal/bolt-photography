import IImage from '../interfaces/image';
import ImageCard from './ImageCard';

export default function ImageDislay({ images }: { images: IImage[] }) {
  return (
    <div className="h-full grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-2">
      {images.map((image, index) => (
        <ImageCard key={index} index={index} image={image} />
      ))}
    </div>
  );
}
