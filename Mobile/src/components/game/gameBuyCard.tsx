import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import GogButton from '../customElements/gogButton'
import { putAddGameToCart } from '../../services/gamesService'
import { useRouter } from 'expo-router'
import { User } from '../../types/user'
import { Game } from '../../types/game'
import { APIException } from '../../services/exceptions'
import { useAuth } from "../../context/authContext";

interface GameBuyCardProperties {
    amount: number
    currency: string
    user?: User | null;
    game: Game;
}

const GameBuyCard: React.FC<GameBuyCardProperties> = ({ amount, currency, user, game }) => {
    const { token } = useAuth();
    const router = useRouter()

    const handleBuyPress = async () => {
        if (!user) {
            router.replace('/login')
            return
        }
        try {
            await putAddGameToCart(game.id, token);
            router.replace('/(tabs)/cart');
        } catch (err) {
            if (err instanceof APIException) {
                router.replace(err.path);
            }
        }
    }

    return (
        <View style={styles.container}>

            <View style={styles.buyCardContainer}>
                <View style={styles.contentContainer}>
                    <Text style={styles.whiteText}>Buy</Text>
                    <View style={styles.izqContainer}>
                        <Text style={styles.whiteText2}>{currency}</Text>
                        <Text style={styles.whiteText}>{amount.toFixed(2)}</Text>
                    </View>
                </View>
                <View>
                    <GogButton
                        bgColor="green"
                        fontColor="black"
                        onHandlePress={handleBuyPress}>
                        Buy
                    </GogButton>
                </View>
            </View>
        </View>
    )
}

export default GameBuyCard;

const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    buyCardContainer: {
        backgroundColor: 'grey',
        borderRadius: 10,
        padding: 10,
    },
    whiteText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25
    },
    whiteText2: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25,
        marginRight: 5
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    izqContainer: {
        flexDirection: 'row',
    },
});