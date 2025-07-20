// hooks
import "./user.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
// components
import List from "../../layouts/list/list";
import SearchResultSkeleton from "../../components/placeHolderSkeletons/searchResultSkeleton/searchResultSkeleton";
import ReviewCard from "../../components/cards/reviewCard/reviewCard";
import ProfileSection from "../../components/profileSection/profileSection";
import Pagination from "../../components/pagination/pagination";
// services
import { getUserWith, addOrRemoveFriend, getUserFriends, getUserReviews } from "../../services/userService";
import { getUser } from "../../services/token";
// exceptions
import { APIException } from "../../services/exceptions";

const UserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [following, setFollowing] = useState(false);

  const isMyFriend = (friends) => {
    return friends.some((f) => String(f.id) === id);
  };

  const updateFriends = async (currentUser) => {
    try {
      const friends = await getUserFriends(currentUser.id);
      setFollowing(isMyFriend(friends));
      return friends;
    } catch (err) {
      if (err instanceof APIException) {
        navigate(err.path);
      }
      return [];
    }
  };

  useEffect(() => {
    const init = async () => {
      const currentUser = getUser();
      if (!currentUser) {
        setFollowing(false);
        return;
      }
      await updateFriends(currentUser);
    };
    init();
  }, [id]);

  const addOrRemoveFriendButton = async () => {
    try {
      const currentUser = getUser();
      if (!currentUser) {
        toast.error("Must be logged in first");
        return;
      }
      await addOrRemoveFriend(id);
      const friends = await updateFriends(currentUser);
      if (isMyFriend(friends)) {
        toast.success("Followed successfully");
      } else {
        toast.success("Unfollowed successfully");
      }
    } catch (_) {
      toast.error("Something went wrong");
    }
  };

  return (
    <List title="REVIEWS">
      <List.Header>
        <div className="personal-info-section"></div>
        <ProfileSection
          callbackEndpoint={() => getUserWith(id)}
          callbackButton={addOrRemoveFriendButton}
          buttonText={following ? "Remove Friend" : "Add Friend"}
        />
      </List.Header>
      <List.Body>
        <Pagination
          func={() => getUserReviews(id)}
          CardComponent={ReviewCard}
          LoadingComponent={SearchResultSkeleton}
          useGrid={false}
          useAnimation={false}
        />
      </List.Body>
    </List>
  );
};

export default UserPage;
