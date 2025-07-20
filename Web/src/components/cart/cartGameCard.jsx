import "./cartGameCard.css";

const CartGameCard = ({ gameName, gamePrice, gameImage }) => {

  return (
    <div className="cartGameCard">
      <div className="cartGameCardImage">
        <img src={gameImage} alt={`imagen de ${gameName}`} />
      </div>
      <div className="nameSection">
        <span>{gameName}</span>
      </div>
      <div className="priceSection">
        <h3>{gamePrice.currency}</h3>
        <h3>{gamePrice.amount.toFixed(2)}</h3>
      </div>

    </div>

  );
};

export default CartGameCard;