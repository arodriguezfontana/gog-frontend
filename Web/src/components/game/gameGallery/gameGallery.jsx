import { useEffect, useState } from "react";
import "./gameGallery.css";

const GameGallery = ({multimedia, name}) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const altText = `${name} in-game image.`;

  useEffect(() => {
    if (multimedia.length > 0) {
      setSelectedImage(multimedia[0]);
    }
  }, [multimedia]);

  return (
    <div className="game-gallery">
      {selectedImage && (
        <div className="main-image">
          <img src={selectedImage.url} alt={altText} />
        </div>
      )}

      <div className="image-row">
        {multimedia.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={altText}
            className="image"
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default GameGallery;