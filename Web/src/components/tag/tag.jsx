import "./tag.css";
import { useNavigate } from "react-router-dom";

const Tag = ({ name, id, handleClick = true }) => {
  const navigate = useNavigate();

  const handleTagClick = (tagId, tagName) => {
    if (handleClick)
      navigate(`/tags/${tagId}`, { state: { tagName } });
  };

  return (
    <button
      type="button"
      className="tag"
      onClick={(e) => {
        if (handleClick) e.stopPropagation();
        handleTagClick(id, name);
      }}
    >
      {name}
    </button>
  );
};

export default Tag;
