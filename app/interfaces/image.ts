interface IImage {
  file: File;
  favorite: boolean;
  recentlyAdded: boolean;
  hidden: boolean;
  trash: boolean;
  uploadTime: Date;
}

export default IImage;
