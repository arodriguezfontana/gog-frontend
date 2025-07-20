import "./bigGameCard.css";
import { useNavigate } from "react-router-dom";
const BigGameCard = ({ card }) => {
  const navigate = useNavigate();
  return (
    <div className="big-game-card-container" title={card.name} onClick={() => navigate(card.href)}>
      <img className="big-game-card-main-image" src={card.mainImage} alt={card.name} />
      <div className='big-game-card' >
        <h2 className="big-game-card-title">{(card.name).toUpperCase()}</h2>
      </div>
    </div>
  );
};

export default BigGameCard;
