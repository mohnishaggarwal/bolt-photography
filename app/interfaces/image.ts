interface IImage {
  file: File;
  favorite: boolean;
  hidden: boolean;
  trash: boolean;
  uploadTime: number;
  tags: string[]
}

export default IImage;
