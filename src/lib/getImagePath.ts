export const getImagePath = ({
  imagePath,
  size = "w500",
  fullSize,
}: { imagePath?: string; size?: string; fullSize?: boolean } = {}) =>
  imagePath
    ? `http://image.tmdb.org/t/p/${fullSize ? "original" : size}/${imagePath}`
    : "/fallback-img.webp";
