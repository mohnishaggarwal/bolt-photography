'use client';

import AddIcon from '@mui/icons-material/Add';

export default function UploadButton() {
  return (
    <button className="w-3/5 min-w-[150px] bg-accent-300 hover:bg-accent-200 rounded-full shadow-lg">
      <div className="flex justify-evenly items-center w-full my-1">
        Add New
        <AddIcon color="secondary" fontSize="large" />
      </div>
    </button>
  );
}
