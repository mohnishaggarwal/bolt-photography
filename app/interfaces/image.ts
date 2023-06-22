interface IImage {
  file: File;
  favorite: boolean;
  recentlyAdded: boolean;
  hidden: boolean;
  trash: boolean;
  uploadTime: number;
  tags: string[]
}

export default IImage;
