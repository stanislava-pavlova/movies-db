export const getImagePath = (imagePath?: string, fullSize?: boolean) =>
  imagePath
    ? `http://image.tmdb.org/t/p/${fullSize ? "original" : "w500"}/${imagePath}`
    : "https://links.papareact.com/o8z";
