// imgs
import recommended from "../../assets/images/recommended.png";
import notRecommended from "../../assets/images/notRecommended.png";
// syles
import "./isRecommended.css";
const IsRecommendedIcon = ({ review }) => {
  return (
    <img className="reco-img"
      src={review.isRecommended ? recommended : notRecommended}
      alt={review.isRecommended ? "Recommended." : "Not recommended."}
    />
  );
};

export default IsRecommendedIcon;
