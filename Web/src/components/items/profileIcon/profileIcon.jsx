//syles
import "./profileIcon.css";
// hooks
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
// services
import { getUser } from "../../../services/token";

const ProfileIcon = ({ user, schemeColor = "black" }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const goToProfile = () => {
    const currentUser = getUser();
    if (currentUser && currentUser.id === user.id) {
      toast.success("You are already in your profile");
      return;
    }
    if (id === user.id) {
      toast.success("You are already in the profile");
      return;
    }
    navigate(`/users/${user.id}`);
  };

  return (
    <div className={`persona-info ${schemeColor}`}>
      <img
        src={user.image}
        alt={user.name}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/src/assets/icons/user-default-profile-image.svg";
        }}
      />
      <p className="nickname" title={`Visit profile of ${user.name}`} onClick={goToProfile}>{user.name}</p>
    </div>
  );
};

export default ProfileIcon;
