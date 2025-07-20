import "./tagCard.css";
import { useNavigate } from "react-router-dom";

const TagCard = ({ card }) => {
  const navigate = useNavigate();
  const tagCardNameClazz = card.id ? "tag-card-name" : "tag-card-name gray";
  const tagCardCardClazz = card.id ? "tag-card" : "tag-card gray";

  const handleTagClick = (tagId, tagName) => {
    if (!tagId) {
      navigate("/tags");
      return;
    }
    navigate(`/tags/${tagId}`, { state: { tagName } });
  };

  return (
    <article
      className={tagCardCardClazz}
      onClick={() => handleTagClick(card.id, card.name)}
    >
      <div className={tagCardNameClazz}>
        <p className="tag-card-name-text">{card.name}</p>
      </div>
      <img src={card.image.src} alt={card.name} className="tag-card-img " />
    </article>
  );
};

export default TagCard;
