import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { User } from '../types/user';
import GogButton from './customElements/gogButton';
import { CustomToast } from './customToast';

type ProfileSectionProps = {
    user: User | undefined,
    buttonText: string,
    buttonHandleClick: Function
};

const ProfileSection: React.FC<ProfileSectionProps> = ({ user, buttonText, buttonHandleClick }) => {
    const link = user?.mainImage || user?.image

    return (
        <View style={styles.container}>
            <CustomToast></CustomToast>
            <Image
                source={{ uri: link }}
                style={styles.image}
            />
            <View style={styles.infoContainer}>
                <Text style={styles.userName}>{user?.name.toUpperCase()}</Text>
                <GogButton fontColor="white" onHandlePress={() => buttonHandleClick()}>
                    <Text style={styles.buttonText}>{buttonText}</Text>
                </GogButton>
            </View>
        </View>
    );
};

export default ProfileSection;

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        gap: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "white",
    },
    infoContainer: {
        width: 100,
        flex: 1,
        justifyContent: "space-between",
    },
    userName: {
        fontFamily: "Inter",
        fontWeight: "700",
        fontSize: 22,
        lineHeight: 28,
        letterSpacing: 0,
    },
    buttonText: {
        fontWeight: "600",
        fontSize: 20,
        lineHeight: 28,
        letterSpacing: 0,
    },
});
