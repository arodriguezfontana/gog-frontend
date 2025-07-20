import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../context/authContext";
//types
import { User as UserType } from "../types/user";
import { Review } from "../types/review";
// services
import { getUserById, getUserFriends, getUserReviews, addOrRemoveFriend, getCurrentUser } from "../services/userService";
// exceptions
import { useModal } from "./useModal";

export function useUserProfile(userId: string | string[] | undefined) {
    const [user, setUser] = useState<UserType | undefined>();
    const [loading, setLoading] = useState(true);
    const [following, setFollowing] = useState(false);
    const { isModalShow, handleOpenModal, handleCloseModal } = useModal();

    const { token } = useAuth();
    const router = useRouter();

    const isMyFriend = (friends: UserType[] | undefined): boolean => {
        return Array.isArray(friends)
            ? friends.some((f: UserType) => String(f.id) === userId)
            : false;
    }

    useEffect(() => {
        const init = async () => {
            try {
                const res = await getUserById(userId);
                setUser(res?.data);

                if (token) {
                    const currentUserRes = await getCurrentUser(token);
                    const currentUser = currentUserRes?.data;
                    const friends = await getUserFriends(currentUser?.id);
                    const isFollowing = isMyFriend(friends);
                    setFollowing(isFollowing);
                }
            } catch (_) {
            } finally {
                setLoading(false);
            }
        };

        init();
    }, []);

    const addOrRemoveFriendButton = async () => {
        try {
            if (!token) {
                handleOpenModal();
                return;
            }

            await addOrRemoveFriend(userId, token);

            const currentUserRes = await getCurrentUser(token);
            const currentUser = currentUserRes?.data;
            const friends = await getUserFriends(currentUser?.id);
            const isFollowing = isMyFriend(friends);
            setFollowing(isFollowing);
        } catch (err) {
            alert("Something went wrong");
        }
    };

    const reviews = async (page: number): Promise<{ components: Review[]; amountOfPages: number }> => {
        const response = await getUserReviews(userId);
        const reviews = Array.from(new Set(response?.data ?? [])) as Review[];
        return { components: reviews, amountOfPages: 1 };
    };


    const goToLogin = () => {
        handleCloseModal()
        router.push('/login');
    }

    return {
        reviews,
        loading,
        user,
        following,
        addOrRemoveFriendButton,
        isModalShow,
        handleCloseModal,
        goToLogin
    };
}
