import React from 'react'
import { Animated, View, Pressable, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useModalAnimation } from '../hooks/useModalAnimation'

type GogModalType = {
    showModal: boolean
    closeModal: () => void
    children: React.ReactNode
}

const GogModal: React.FC<GogModalType> = ({ showModal = false, closeModal, children }) => {
    const { closeModalWithAnimation, scaleAnim } = useModalAnimation(showModal, closeModal)

    if (!showModal) return null;

    return (
        <View style={styles.modalBackgroud}>
            <Pressable onPress={closeModalWithAnimation} style={styles.modalOverlay}>
                <Animated.View style={[styles.modalContent, { transform: [{ scale: scaleAnim }] }]}>
                    {children}
                    <Pressable onPress={closeModalWithAnimation} style={styles.closeButton}>
                        <Feather name="x" size={20} color="black" />
                    </Pressable>
                </Animated.View>
            </Pressable>
        </View>
    );
};

export default GogModal;

const styles = StyleSheet.create({
    modalBackgroud: {
        position: "absolute",
        inset: 0,
        margin: "auto",
        backgroundColor: "rgba(42, 36, 44, 0.5)",
        width: "100%",
        height: "100%",
        zIndex: 1,
        flex: 1,
    },
    modalOverlay: {
        width: "100%",
        flex: 1,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    modalContent: {
        borderRadius: 8,
        gap: 12,
        backgroundColor: "#D9D9D9",
        padding: 24,
        position: "relative",
    },
    closeButton: {
        position: "absolute",
        right: 4,
        top: 4,
    }
});
