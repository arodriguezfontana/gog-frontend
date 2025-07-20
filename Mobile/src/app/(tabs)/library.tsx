// hooks
import { useUserLibrary } from "../../hooks/useUserLibrary";
// components
import AppLayout from "../../components/appLayout";
import Spinner from "../../components/gogSpinner";
import ProfileSection from "../../components/profileSection";
import Pagination from "../../components/pagination";
import Card from "../../components/card";
import { Redirect } from "expo-router";

export default function ProfileScreen() {
    const { logoutHandleClick, isLoading, user, callbackCurrentUser, token } = useUserLibrary()

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : token ? (
                <AppLayout>
                    <Pagination
                        title="YOUR GAMES"
                        CardComponent={Card}
                        callbackUsePagination={false}
                        HeaderComponent={
                            <ProfileSection
                                user={user}
                                buttonText="Logout"
                                buttonHandleClick={() => logoutHandleClick()}
                            />
                        }
                        callback={callbackCurrentUser}
                    />
                </AppLayout>
            ) : (
                <Redirect href="/" />
            )}
        </>
    )
}