import "./gameWithUserReview.css";
import IsRecommendedIcon from "../../../isRecommended/isRecommended.jsx";
import ProfileIcon from "../../../items/profileIcon/profileIcon.jsx";

const GameWithUserReview = ({ user, userReview }) => {

  return(
    <div className="user-own-review">
      <div className="user-own-review-top">
        <div className="user-own-review-profile-container">
          <ProfileIcon user={user} schemeColor="white" />
        </div>
        <div className="user-own-review-recommended">
          <IsRecommendedIcon review={userReview} />
        </div>
      </div>
      <p className="user-own-review-text">{userReview.text}</p>
    </div>
  );
};

export default GameWithUserReview;