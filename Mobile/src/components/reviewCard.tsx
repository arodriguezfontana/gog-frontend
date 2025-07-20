//components
import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import Card from './card'
//types
import { Review } from '../types/review'
//images
import notRecommended from '../assets/images/notRecommended.png'
import isRecommended from '../assets/images/recommended.png'

type ReviewCardProps = {
    card: Review
}

const ReviewCard: React.FC<ReviewCardProps> = ({ card }) => {
    const recommendationImage = card.isRecommended ? isRecommended : notRecommended

    return (
        <Card
            card={card.game}
            imageOverlay={
                <View style={styles.recommendationContainer}>
                    <Image
                        source={recommendationImage}
                        style={styles.recommendationImage}
                    />
                </View>
            }
        >
            <Text style={styles.reviewText}>
                {card.text}
            </Text>
        </Card>
    )
}

const styles = StyleSheet.create({
    reviewText: {
        fontWeight: '600',
        fontSize: 22,
        lineHeight: 28,
        letterSpacing: 0,
    },
    recommendationContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
    },
    recommendationImage: {
        width: 40,
        height: 40,
        opacity: 0.9,
    }
})

export default ReviewCard
