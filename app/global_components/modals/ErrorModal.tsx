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
      <h2 className="ml-4 font-bold text-2xl">An Error Occurred 😕</h2>
    </div>
  );
}

function ModalBody({ errorMsg }: { errorMsg: string }) {
  return (
    <div className="m-4 flex">
      <p className="text-left">{errorMsg}</p>
    </div>
  );
}

function ModalExit({ onClose }: { onClose: () => void }) {
  return (
    <button onClick={onClose} className="absolute top-2.5 font-bold right-2.5">
      X
    </button>
  );
}

export default function ErrorModal({
  isOpen,
  onClose,
  errorMsg,
}: {
  isOpen: boolean;
  onClose: () => void;
  errorMsg: string;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-accent-300 relative text-white rounded-lg w-[375px]">
        <ModalHeader />
        <hr />
        <ModalBody errorMsg={errorMsg} />
        <ModalExit onClose={onClose} />
      </div>
    </Modal>
  );
}
