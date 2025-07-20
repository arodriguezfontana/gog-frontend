import "../tagCard/tagCard.css";
import { useNavigate } from "react-router-dom";

const GameCard = ({ card }) => {
  const navigate = useNavigate();
  const cardClass = card.id ? "tag-card" : "tag-card gray";
  const nameClass = card.id ? "tag-card-name" : "tag-card-name gray";

  return (
    <article className={cardClass} onClick={() => navigate(`/games/${card.id}`)}>
      <div className={nameClass}>
        <p className="tag-card-name-text">{card.name}</p>
      </div>
      <img
        src={card.mainImage?.src || card.mainImage}
        alt={card.name}
        className="tag-card-img"
      />
    </article>
  );
};

export default GameCard;
