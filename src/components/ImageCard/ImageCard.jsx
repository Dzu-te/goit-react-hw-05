export const ImageCard = ({ src, alt, onClick }) => {
  return (
    <li>
      <img onClick={onClick} src={src} alt={alt} />
    </li>
  );
};
