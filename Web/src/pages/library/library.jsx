// services
import { getCurrentUser } from "../../services/userService";
import { logoutUser } from "../../services/token";
// components
import Pagination from "../../components/pagination/pagination.jsx";
import GameLargeCard from "../../components/cards/gameCardList/gameCardList.jsx";
import SearchResultSkeleton from "../../components/placeHolderSkeletons/searchResultSkeleton/searchResultSkeleton.jsx";
import ProfileSection from "../../components/profileSection/profileSection.jsx";
import List from "../../layouts/list/list.jsx";
import Spinner from "../../components/spinner/spinner.jsx";
// styles
import "./library.css";
// hooks
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Library = ({ authState }) => {

  const navigate = useNavigate();
  const { user, setUser } = authState;

  useEffect(() => {
    if (!user) navigate("/login");
  }, []);

  const logout = () => {
    try {
      logoutUser();
      setUser(null);
      navigate("/");
      toast.success("Log Out Succesfully");
    } catch (_) {
      toast.error("Something was wrong");
    }
  };

  return (
    !user ?
      <Spinner />
      :
      <List
        title="GAMES">
        <List.Header>
          <div className="personal-info-section"></div>
          <ProfileSection
            callbackEndpoint={getCurrentUser}
            callbackButton={logout}
            buttonText={"Logout"}
          >
          </ProfileSection>
        </List.Header>
        <List.Body>
          <Pagination
            func={getCurrentUser}
            CardComponent={GameLargeCard}
            LoadingComponent={SearchResultSkeleton}
            useGrid={false}
            useAnimation={false}
            lastMessage="You don't have games yet"
          >
          </Pagination>
        </List.Body>
      </List >
  );
};

export default Library;
