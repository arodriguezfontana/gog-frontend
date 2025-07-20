import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { Review } from '../../types/review'
import IsRecommendedIcon from '../icon/isRecommendedIcon'
import ProfileIcon from '../icon/profileIcon'

interface GameReviewsProperties {
    reviews: Review[]
    colorSchema: string
}

const GameReviews: React.FC<GameReviewsProperties> = ({ reviews, colorSchema }) => {
    const router = useRouter();

    const gameReviews = reviews.slice(0, 6).map((review, index) => (
        <View key={index} style={styles.reviewContainer}>
            <View style={styles.reviewTop}>
                <View>
                    <ProfileIcon user={review.user} colorSchema={colorSchema} />
                </View>
                <TouchableOpacity onPress={() => router.push(`/profile/${review.user.id}`)}>
                    <Text style={[styles.name, { color: colorSchema }]}>
                        {review.user.name}
                    </Text>
                </TouchableOpacity>
                <View>
                    <IsRecommendedIcon review={review} />
                </View>
            </View>
            <Text style={[styles.text, { color: colorSchema }]}>{review.text}</Text>
        </View>
    ))

    return (
        <View style={styles.container}>
            <View>
                {gameReviews}
            </View>
        </View>
    );
};

export default GameReviews;

const styles = StyleSheet.create({
    container: {
        marginBottom: 30
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold'
    },
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
    name: {
        fontWeight: 'bold',
        fontSize: 16
    }
});