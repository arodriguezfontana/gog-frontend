import { Text, View, StyleSheet } from "react-native"
import { IconCart } from "../../assets/icons/svgComponets/iconCart"
import GogButton from "../customElements/gogButton"
import { Stack } from "expo-router"

export const CartWithoutGames = () => {
    return (
        <>
            <Stack.Screen options={{
                headerShown: true,
                headerTitle: "Cart"
            }} />
            <View style={styles.continer}>
                <View style={styles.cartPageContainer}>
                    <View style={styles.cartIconContainer}>
                        <IconCart />
                    </View>
                    <View>
                        <Text style={styles.cartTextContainer}> Start by Addin a Game!</Text>
                    </View>
                    <View style={styles.cartbuttonContainer}>
                        <GogButton goTo='/' bgColor='#7DC215' fontColor='black'>
                            Add games
                        </GogButton>
                    </View>
                </View>
            </View >
        </>
    )

}

const styles = StyleSheet.create({
    continer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartPageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: "70%"

    },
    cartIconContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    cartTextContainer: {
        margin: 10,
        fontSize: 20
    },
    cartbuttonContainer: {
        letterSpacing: 0,
        backgroundColor: "#7DC215",
        borderRadius: 3,
        margin: 2,
        alignSelf: "stretch"
    },
});

