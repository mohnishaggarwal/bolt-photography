'use client';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DownloadIcon from '@mui/icons-material/Download';
import FileUploadIcon from '@mui/icons-material/FileUpload';

export default function IconMenu() {
  return (
    <div className="flex items-center justify-center">
      <IconButton aria-label="upload">
        <FileUploadIcon color="info" />
      </IconButton>
      <IconButton aria-label="visibility">
        <VisibilityOffIcon color="info" />
      </IconButton>
      <IconButton aria-label="download">
        <DownloadIcon color="info" />
      </IconButton>
      <IconButton aria-label="favorite">
        <FavoriteBorderIcon color="info" />
      </IconButton>
      <IconButton aria-label="delete">
        <DeleteOutlineIcon color="info" />
      </IconButton>
    </div>
  );
}
