import "./gameBigImage.css";

const GameBigImage = ({name, mainImage}) => {
  return (
    <div className="big-game-image">
      <div className="image-container">
        <img src={mainImage} alt={name} />
        <h1>{name}</h1>
      </div>
    </div>
  );
};

export default GameBigImage;