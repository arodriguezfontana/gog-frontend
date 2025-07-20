import "./gameReviews.css";
import IsRecommendedIcon from "../../isRecommended/isRecommended.jsx";
import ProfileIcon from "../../items/profileIcon/profileIcon.jsx";

const GameReviews = ({ reviews }) => {

  return (
    <div className="reviews">
      {reviews.slice(0, 6).map((r, i) => (
        <div key={i} className="review">
          <div className="review-top">
            <div className="game-reviews-profile-container">
              <ProfileIcon user={r.user} schemeColor="white" />
            </div>
            <IsRecommendedIcon review={r} />
          </div>
          <p className="review-text">{r.text}</p>
        </div>
      ))}
    </div>
  );
};

export default GameReviews;