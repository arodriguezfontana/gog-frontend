import "./gameCardList.css";
import { useNavigate } from "react-router-dom";
import GameCardListLayout from "../../../layouts/gameCardListLayout/gameCardListLayout.jsx";
import Tag from "../../tag/tag.jsx";

const GameCardList = ({ card }) => {
  const finalCard = card.game ?? card;
  const navigate = useNavigate();

  const handleCardClick = (gameId) => {
    navigate(`/games/${gameId}`);
  };

  return (
    <GameCardListLayout
      card={finalCard}
      onClick={() => handleCardClick(card.id)}
    >
      <div className="tags-card-container">
        {finalCard.tags.map((tag, index) => (
          <Tag
            key={index}
            name={tag.name}
            id={tag.id}
          />
        ))}
      </div>
    </GameCardListLayout>
  );
};

export default GameCardList;
