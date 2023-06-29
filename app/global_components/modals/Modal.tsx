import { ReactNode, SyntheticEvent } from 'react';

export default function Modal({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  const handleClose = (event: SyntheticEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    if (target.id === 'modal-wrapper') {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={handleClose}
      id="modal-wrapper"
    >
      {children}
    </div>
  );
}
