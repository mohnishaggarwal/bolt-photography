import Modal from './Modal';
import Image from 'next/image';

function ModalHeader() {
  return (
    <div className="flex items-center m-4">
      <Image
        src="/images/error_vector.svg"
        alt="Upload error"
        width={32}
        height={32}
        className="object-contain"
      />
      <h2 className="ml-4 font-bold text-2xl">Image Upload Error</h2>
    </div>
  );
}

function ModalBody() {
  return (
    <div className="m-4 flex">
      <p className="text-left">
        Currently, Bolt only supports PNGs and JPEGs. Be patient with us as we
        slowly begin supporting more types!
      </p>
    </div>
  );
}

function ModalExit() {
  return (
    <button onClick={onClose} className="absolute top-2.5 font-bold right-2.5">
      X
    </button>
  );
}

export default function UploadErrorModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-accent-300 relative text-white rounded-lg w-[375px]">
        <ModalHeader />
        <hr />
        <ModalBody />
        <ModalExit />
      </div>
    </Modal>
  );
}
