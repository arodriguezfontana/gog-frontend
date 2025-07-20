import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { User } from '../../types/user'

interface ProfileIconProperties {
    user: User
    colorSchema: string
}

const ProfileIcon: React.FC<ProfileIconProperties> = ({ user, colorSchema }) => {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: user.image }}
                style={[styles.image, { borderColor: colorSchema }]}
            />
        </View>
    )
}

export default ProfileIcon;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'white'
    },
});