import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { Multimedia } from '../../types/utils'

interface GameGalleryProperties {
    name: string
    multimedia: Multimedia[]
}

const GameGallery: React.FC<GameGalleryProperties> = ({ name, multimedia }) => {

    const altText = `${name} in-game image.`;

    const gameMultimedia = multimedia.map((image, index) => (
        <View key={index} style={styles.imageContainer}>
            <Image
                source={{ uri: image.url }}
                style={styles.image}
                accessibilityLabel={altText}
            />
        </View>
    ));

    return (
        <View style={styles.container} >
            <View style={styles.galleryLayout}>
                {gameMultimedia}
            </View>
        </View>
    )
};

export default GameGallery;

const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    galleryLayout: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10
    },
    imageContainer: {
        width: '48%'
    },
    image: {
        width: '100%', aspectRatio: 16 / 9
    }
});