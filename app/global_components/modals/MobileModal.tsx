import Modal from './Modal';
import Image from 'next/image';

export default function MobileModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-accent-300 relative p-8 flex flex-col justify-center items-center text-white rounded-lg w-[325px]">
        <Image
          src="/images/mobile_screen_detected.svg"
          alt="Not found image"
          width={150}
          height={150}
          className="object-contain mb-6"
        />
        <center className="text-sm px-8">
          <h2 className="text-2xl mb-2 font-semibold">Mobile Detected</h2>
          You can view and download your uploads from mobile, but desktop is
          required to get the full functionality of Bolt.
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
