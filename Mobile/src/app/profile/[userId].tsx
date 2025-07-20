//components
import Spinner from '../../components/gogSpinner'
import AppLayout from '../../components/appLayout'
import Pagination from '../../components/pagination'
import ReviewCard from '../../components/reviewCard'
import ProfileSection from '../../components/profileSection'
import { Redirect, Stack } from 'expo-router'
import GogButton from '../../components/customElements/gogButton'
import H2 from '../../components/customElements/h2'
import GogModal from '../../components/gogModal'
//hooks
import React from 'react'
import { useUserProfile } from '../../hooks/useUserProfile'
import { useLocalSearchParams } from 'expo-router'
// contexts
import { useAuth } from '../../context/authContext'

const UserPage = () => {
    const { userId } = useLocalSearchParams()
    const { reviews, loading, user, following, addOrRemoveFriendButton, goToLogin, isModalShow, handleCloseModal } = useUserProfile(userId);
    const { id } = useAuth();

    if (loading) {
        return (<Spinner />)
    }

    if (id != null && userId === id) {
        return (<Redirect href={"/(tabs)/library"} />)
    }

    return (
        <>
            <GogModal showModal={isModalShow} closeModal={handleCloseModal}>
                <H2>You must be logged in first</H2>
                <GogButton
                    onHandlePress={goToLogin}
                    fontColor='lightGrey'
                >
                    Sign in
                </GogButton>
            </GogModal>
            <Stack.Screen options={{ title: "Profile" }} />
            <AppLayout hasTopSpace={false}>
                <Pagination
                    title="REVIEWS"
                    CardComponent={ReviewCard}
                    callbackUsePagination={false}
                    HeaderComponent={<ProfileSection
                        user={user}
                        buttonText={following ? "Remove Friend" : "Add Friend"}
                        buttonHandleClick={addOrRemoveFriendButton}
                    />}
                    callback={reviews}
                />
            </AppLayout>
        </>
    )
}

export default UserPage


