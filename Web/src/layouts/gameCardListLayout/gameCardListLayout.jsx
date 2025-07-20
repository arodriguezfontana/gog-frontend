// components
import Price from "../../components/price/price.jsx";
// styles
import "./gameCardListLayout.css";

const GameCardListLayout = ({ card, children, onClick, showTitle = true, mouseDefault = false }) => {
  const finalCard = card.game ?? card;
  const image = finalCard.imageUrl || finalCard.mainImage;
  const finalName = finalCard.title
    ? finalCard.title.toUpperCase()
    : finalCard.name.toUpperCase();

  return (
    <article className="game-card-list-layout">
      <div className={`game-card-list-layout-container ${mouseDefault ? "default" : ""}`}>
        <img
          onClick={onClick}
          src={image}
          alt={card.title || card.name || card.game.name}
        />
        <div className="game-card-list-layout-info-container">
          <p
            onClick={onClick}
            className={`game-card-list-layout-title ${mouseDefault ? "default" : ""} ${showTitle ? "" : "none"}`}
          >
            {finalName}
          </p>
          <div className="game-card-list-layout-info">{children}</div>
        </div>
        <div className="game-card-list-layout-price">
          <Price card={card} />
        </div>
      </div>
    </article>
  );
};

export default GameCardListLayout;
