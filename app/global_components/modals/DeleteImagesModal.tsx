import Image from 'next/image';
import { useImagesContext } from '@/app/contexts/images/ImagesContext';
import Modal from './Modal';
import { useAuthContext } from '@/app/contexts/auth/AuthContext';

export default function DeleteImagesModal({
  numImagesDelete,
  deleteAll,
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  deleteAll: boolean;
  numImagesDelete: string;
  onClose: () => void;
}) {
  const { dispatch } = useImagesContext();
  const { user } = useAuthContext();

  const handleDelete = () => {
    if (deleteAll) {
      dispatch({ type: 'DELETE_ALL_TRASH', payload: user.email });
    } else {
      dispatch({ type: 'DELETE_IMAGES', payload: user.email });
    }
    onClose();
  };

  const plural = parseInt(numImagesDelete) > 1;

  if (!isOpen) {
    return null;
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-accent-300 relative p-8 flex flex-col justify-center items-center text-white rounded-lg w-3/12 max-w-[300px]">
        <Image
          src="/images/delete_vector.svg"
          alt="Not found image"
          width={150}
          height={150}
          className="object-contain mb-6"
        />
        <h2 className="text-2xl mb-2 font-semibold">
          Deleting <p className="inline text-highlight">{numImagesDelete}</p>{' '}
          Photo{plural && 's'}
        </h2>
        <center className="text-sm mb-6">
          Are you sure you want to delete {numImagesDelete} photo{plural && 's'}
          ? Once deleted, they cannot be recovered.
        </center>
        <div className="absolute w-full rounded-b-lg border-t bottom-0 flex justify-center items-center">
          <button
            className="p-2 flex justify-center items-center w-1/2 border-r hover:bg-accent-200"
            onClick={() => onClose()}
          >
            Cancel
          </button>
          <button
            className="p-2 flex justify-center items-center w-1/2 hover:bg-accent-200 text-red-300 font-semibold"
            onClick={handleDelete}
          >
            Yes! Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}
