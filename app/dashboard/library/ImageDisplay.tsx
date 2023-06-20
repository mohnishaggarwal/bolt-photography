import ImageCard from './ImageCard';

export default function ImageDislay({ images }: { images: File[] }) {
  return (
    <div className="h-full grid gap-8 grid-cols-6 grid-rows-2">
      {images.map((image, index) => (
        <ImageCard key={index} index={index} image={image} />
      ))}
    </div>
  );
}
