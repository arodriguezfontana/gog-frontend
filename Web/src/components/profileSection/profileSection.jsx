// styles
import "./profileSection.css";
//compontens
import Button from "../button/button.jsx";
import ProfileIcon from "../items/profileIcon/profileIcon";
// hooks
import { useEffect, useState } from "react";
// exceptions
import { APIException } from "../../services/exceptions.js";
// hooks
import { useNavigate } from "react-router-dom";

const ProfileSection = ({ callbackEndpoint, callbackButton, buttonText }) => {
  const [user, setUser] = useState({
    id: "",
    email: "",
    name: "",
    image: "/src/assets/icons/user-default-profile-image.sv",
    backgroundImage: "/src/assets/icons/user-default-profile-image.sv",
    games: []
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await callbackEndpoint();
        const { data } = res;
        if (data) setUser(data);
      } catch (err) {
        if (err instanceof APIException) {
          navigate(err.path);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <section className="personal-info-container">
      {loading
        ? (
          <div className="profile-skeleton-info">
            <div className="profile-skeleton-img" />
            <div className="profile-skeleton-name-container">
              <p className="profile-skeleton-name"></p>
            </div>
          </div>
        )
        :
        (
          <div>
            <ProfileIcon user={user} />
          </div>
        )}
      <div className="logout-button-container">
        <Button
          handleClick={callbackButton}
          buttonColor="violet"
        >
          <p className="logout-text">{buttonText}</p>
        </Button>
      </div>
    </section>
  );
};

export default ProfileSection;
