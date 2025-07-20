import { useEffect, useRef } from 'react'
import { Easing } from 'react-native'
import { Animated } from 'react-native'

export function useModalAnimation(showModal: boolean, closeModal: () => void) {
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        if (showModal) {
            Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: true,
            }).start();
        } else {
            scaleAnim.setValue(0.8);
        }
    }, [showModal]);

    const closeModalWithAnimation = () => {
        Animated.timing(scaleAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
            easing: Easing.in(Easing.exp)
        }).start(() => {
            closeModal()
        });
    }

    return { closeModalWithAnimation, scaleAnim }
}