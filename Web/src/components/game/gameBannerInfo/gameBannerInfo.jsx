import "./gameBannerInfo.css";
import GameBigImage from "../gameBigImage/gameBigImage.jsx";
import { useState } from "react";
import Tag from "../../tag/tag.jsx";

const GameBannerInfo = ({
  name,
  mainImage,
  developerName,
  website,
  releaseDate,
  tags,
}) => {
  const [moreActivated, setMoreActivated] = useState(false);

  return (
    <section className="game-banner-section">
      <GameBigImage name={name} mainImage={mainImage} />

      <div className="game-info">
        <div className="info">
          <p>
            <strong>Developer: </strong>
            <u>{developerName}</u>
          </p>
          <p>
            <strong>Website: </strong>
            <a href={website} target="_blank" rel="noreferrer">
              <u>{website}</u>
            </a>
          </p>
          <p>
            <strong>Release date: </strong>
            {releaseDate.split("T")[0]}
          </p>
          <p className="game-banner-info-tags-container">
            <strong>Tags: </strong>
            {tags.slice(0, 5).map((tag, i) => (
              <Tag key={i} name={tag.name} id={tag.id} className="tag" />
            ))}
            <u>
              {tags.length >= 5 && (
                <button
                  onClick={() => setMoreActivated(true)}
                  className="more-button"
                >
                  more...
                </button>)}
            </u>
          </p>
        </div>
      </div>

      {moreActivated && (
        <div className="overlay">
          <div className="overlay-card">
            <button
              onClick={() => setMoreActivated(false)}
              className="close-button"
            >
              X
            </button>
            <h3>All Tags</h3>
            <div className="all-tags">
              {tags.map((tag, i) => (
                <Tag key={i} name={tag.name} id={tag.id} className="tag" />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GameBannerInfo;
