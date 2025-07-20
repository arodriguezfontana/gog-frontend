import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'


function capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

type Tag = {
    name: string;
};


type CardType = {
    id: string | number;
    name?: string;
    mainImage?: string;
    image?: { src?: string } | string;
    tags?: Tag[];

};

type CardProps = {
    card: CardType;
    children?: React.ReactNode;
    imageOverlay?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ card, children, imageOverlay = <></> }) => {
    const finalTitle = card?.name || "Unknown"
    const finalImage =
        card?.mainImage ||
        (typeof card.image === "string"
            ? card.image
            : card?.image?.src) ||
        "https://kinsta.com/es/wp-content/uploads/sites/8/2023/05/typeerror-cannot-read-property-map-of-undefined.jpg"


    const tags = card?.tags?.map((tag: Tag) => capitalize(tag.name)) || []
    const sliceTags = tags?.slice(0, 2)

    return (
        <Link asChild href={`game/${card.id}`}>
            <Pressable>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: finalImage }}
                            style={styles.image}
                        />
                        {imageOverlay}
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.title}>{finalTitle}</Text>
                        <View style={styles.tagsContainer}>
                            {sliceTags.map((a: string, idx: number) => (
                                <Text style={styles.tag} key={idx}>
                                    {a}
                                </Text>
                            ))}
                        </View>
                        {children}
                    </View>
                </View>
            </Pressable>
        </Link>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#EDEDED",
        paddingBottom: 8,
        flex: 1,
        gap: 8,
        borderRadius: 8,
        justifyContent: "center",
    },
    imageContainer: {
        position: "relative"
    },
    image: {
        width: "100%",
        height: 161,
        borderRadius: 8,
        objectFit: "cover",
    },
    content: {
        paddingLeft: 8,
        gap: 4,
    },
    title: {
        fontWeight: '700',
        fontSize: 32,
        lineHeight: 28,
        letterSpacing: 0,
        textTransform: 'uppercase',
    },
    tagsContainer: {
        flexDirection: "row",
        alignContent: "center",
        flexWrap: "nowrap",
        gap: 8
    },
    tag: {
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 28,
        letterSpacing: 0,
        textDecorationLine: 'underline',
    }
})

export default Card