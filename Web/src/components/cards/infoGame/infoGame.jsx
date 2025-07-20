import "./infoGame.css";
import { useNavigate } from "react-router-dom";

const InfoGame = ({ card }) => {
  const tagsSlice = card.tags.slice(0, 10);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/games/${card.id}`);
  };

  return (
    <article className='info-game-card' onClick={() => handleClick()}>
      <div className='info-game-content'>
        <img src={card.mainImage} alt={card.name} className='info-game-image' />
        <div className='info-game-rating'>
          <h4 className='info-card-game-title'>{card.name}</h4>
          <section className="info-game-card-tags">
            {tagsSlice.map((tag, index) => (
              <p
                key={index}
                className='info-game-tag'
              >
                {tag.name}
              </p>
            ))}
          </section>
        </div>
      </div>
      <p className='price'>{card.price.currency} {card.price.amount.toFixed(2)}</p>
    </article>
  );
};

export default InfoGame;
