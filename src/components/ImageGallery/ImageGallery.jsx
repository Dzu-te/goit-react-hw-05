import { ImageCard } from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";

export const ImageGallery = ({ photos, openModal }) => {
  return (
    <ul className={styles.imageGalleryList}>
      {photos != null &&
        Array.isArray(photos) &&
        photos.map((photo) => {
          const {
            alt_description: alt,
            urls: { regular, small },
          } = photo;
          return (
            <ImageCard
              key={photo.id}
              photo={{ alt, src: small }}
              src={small}
              alt={alt}
              onClick={() => openModal({ alt, src: regular })}
            />
          );
        })}
    </ul>
  );
};
