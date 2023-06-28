import Modal from './Modal';
import Image from 'next/image';

function ModalHeader() {
  return (
    <div className="flex items-center m-4">
      <Image
        src="/images/success_vector.svg"
        alt="Upload error"
        width={32}
        height={32}
        className="object-contain"
      />
      <h2 className="ml-4 font-bold text-2xl">Upload Successful</h2>
    </div>
  );
}

function ModalBody() {
  return (
    <div className="m-4 flex">
      <p className="text-left">
        Your images were successfully uploaded onto Bolt! Tags typically take
        around two to five minutes to generate.
      </p>
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

export default function UploadSuccessModal({
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
        <ModalExit onClose={onClose} />
      </div>
    </Modal>
  );
}
