import React from 'react'
import { View, StyleSheet } from 'react-native'

const SkeletonCard = () => {
    return (
        <View style={styles.card}>
            <View style={styles.image} />
            <View style={styles.textBlock} />
            <View style={styles.tagRow}>
                <View style={styles.tag} />
                <View style={styles.tag} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        padding: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 8,
        elevation: 3,

    },
    image: {
        width: 361,
        height: 161,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        marginBottom: 16,
    },
    textBlock: {
        width: '60%',
        height: 24,
        backgroundColor: '#d6d6d6',
        borderRadius: 4,
        marginBottom: 12,
    },
    tagRow: {
        flexDirection: 'row',
        gap: 10,
    },
    tag: {
        width: 80,
        height: 20,
        backgroundColor: '#d0d0d0',
        borderRadius: 4,
    },
})

export default SkeletonCard

