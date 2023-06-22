import Modal from './Modal';
import Image from 'next/image';

export default function FeatureInProgressModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-accent-300 relative p-8 flex flex-col justify-center items-center text-white rounded-lg w-[375px]">
        <Image
          src="/images/feature_in_progress.svg"
          alt="Not found image"
          width={150}
          height={150}
          className="object-contain mb-6"
        />
        <center className="text-sm">
          <h2 className="text-2xl mb-2 font-semibold">Feature in Progress!</h2>
          This feature is still currently in development. Sit tight as we roll
          it out soon!
        </center>
        <button
          onClick={onClose}
          className="absolute top-2.5 font-bold right-2.5"
        >
          X
        </button>
      </div>
    </Modal>
  );
}
