// components
import GameCardListLayout from "../../../layouts/gameCardListLayout/gameCardListLayout.jsx";
import IsRecommendedIcon from "../../isRecommended/isRecommended.jsx";
// reviews
import "./reviewCard.css";
const ReviewCard = ({ card }) => {
  return (
    <div className="review-card-container">
      <GameCardListLayout card={card} mouseDefault={true}>
        <div className="review-card-text-and-recommended">
          <p className="review-card-text">{card.text}</p>
          <div className="review-card-isRecommendaded-container">
            <IsRecommendedIcon review={card} />
          </div>
        </div>
      </GameCardListLayout>
    </div>
  );
};

export default ReviewCard;
