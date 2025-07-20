import "./gameWithAddReview.css";
import { useState } from "react";
import ProfileIcon from "../../../items/profileIcon/profileIcon.jsx";
import recommendedIcon from "../../../../assets/images/recommended.png";
import notRecommendedIcon from "../../../../assets/images/notRecommended.png";
import { toast } from "react-hot-toast";
import { putAddReviewToGame } from "../../../../services/gamesService.js";
import Button from "../../../button/button.jsx";

const GameWithAddReview = ({ user, gameId, onReviewAdded }) => {
  const [isRecommended, setIsRecommended] = useState(null);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const clickAddReviewHandler = async () => {

    if (isRecommended === null) {
      setError("You must select whether the game is recommended or not.");
      return;
    }

    if (!text.trim()) {
      setError("The review text cannot be empty.");
      return;
    }

    try {
      await putAddReviewToGame(gameId, {
        isRecommended,
        text
      });
      toast.success("The review has been added successfully!", {
        position: "top-center"
      });
      if (onReviewAdded) onReviewAdded();
    } catch (_) {
      toast.error("An error occurred while adding the review!", {
        position: "top-center"
      });
    }
  };

  return (
    <div className="user-add-review">
      <div className="review-top">
        <div className="game-reviews-profile-container">
          <ProfileIcon user={user} schemeColor="white" />
          <div className="recommended">
            <span>Recommended</span>
            <img
              src={recommendedIcon}
              alt="Recommended"
              className={`thumb ${isRecommended === true ? "selected" : ""}`}
              onClick={() => setIsRecommended(true)}
            />
            <img
              src={notRecommendedIcon}
              alt="Not Recommended"
              className={`thumb ${isRecommended === false ? "selected" : ""}`}
              onClick={() => setIsRecommended(false)}
            />
          </div>
        </div>
      </div>

      <textarea
        className="review-text-area"
        placeholder="Text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {error && <div className="error-message">{error}</div>}

      <div className="button-container">
        <div className="button-add-review-container">
          <Button handleClick={clickAddReviewHandler} buttonColor={"violet"}>
            Add review
          </Button>
        </div>
      </div>

    </div>
  );
};

export default GameWithAddReview;
