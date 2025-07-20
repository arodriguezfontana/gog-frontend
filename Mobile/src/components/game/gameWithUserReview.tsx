import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { User } from '../../types/user'
import { Review } from '../../types/review'
import ProfileIcon from '../icon/profileIcon'
import IsRecommendedIcon from '../icon/isRecommendedIcon'
import { useRouter } from 'expo-router'

interface GameWithUserReviewProperties {
    user: User;
    userReview: Review;
    colorSchema: string;
}

const GameWithUserReview: React.FC<GameWithUserReviewProperties> = ({ user, userReview, colorSchema }) => {
    const router = useRouter();

    return (
        <View>
            <View style={styles.reviewContainer}>
                <View style={styles.reviewTop}>
                    <View>
                        <ProfileIcon user={user} colorSchema={colorSchema} />
                    </View>
                    <TouchableOpacity onPress={() => router.push(`/profile/${user.id}`)}>
                        <Text style={[styles.name, { color: colorSchema }]}>
                            {user.name}
                        </Text>
                    </TouchableOpacity>
                    <View>
                        <IsRecommendedIcon review={userReview} />
                    </View>
                </View>
                <Text style={[styles.text, { color: colorSchema }]}>
                    {userReview.text}
                </Text>
            </View>
        </View>
    );
};

export default GameWithUserReview;

const styles = StyleSheet.create({
    reviewContainer: {
        backgroundColor: 'grey',
        margin: 5,
        padding: 10
    },
    reviewTop: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 25,
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16
    }
});