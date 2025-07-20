import {  Text, View, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import AppLayout from '../../components/appLayout'
import { CartWithoutGames } from '../../components/cart/cartWithOutGames'
import { Game } from '../../types/game'
import Card from '../../components/card'
import { Stack } from 'expo-router'
import PriceDetail from '../../components/cart/priceDetail'
import useCart from '../../hooks/useCart'



const Cart = () => {
    
    const {getCartGames,token } = useCart();
    
    if (!token || !getCartGames().length) { return <CartWithoutGames /> }

    return (
        <AppLayout hasTopSpace={false} hasSideSpace={true}>
            <Stack.Screen options={{
                headerShown: true,
                headerTitle: "Cart"
            }} 
            
            />  
                <FlatList
                    data={getCartGames()}
                    renderItem={({item}:{item:Game} ) =>
                        <View style={styles.cartContainer}>
                        <Card card={item}>
                            <Text style={styles.priceCard}>{item.price.amount.toFixed(2)}</Text>
                        </Card>
                        </View>
                    }
                    keyExtractor={item => item.id}
                    style={styles.cartProductoContainer}
                    ListHeaderComponent={<View style={styles.listHeader}>
                        <Text style={styles.cartTitle}>Product</Text>
                        <View style={styles.cartHorizontalLine} />
                    </View>}
                />
            <PriceDetail showButton={true} goto='/purchase'>Buy</PriceDetail>

        </AppLayout >
    )
};


const styles = StyleSheet.create({
    cartContainer: {
        marginBottom: 32
    },
    listHeader: {
        marginBottom: 18,
    },
    priceCard: {
        fontSize: 20,
        color: "#6E1D72",
        fontWeight: "bold"
    },
    cartProductoContainer: {
        marginTop: 8,
        backgroundColor: "#898989",
        padding: 16,
        borderRadius: 8,
        
    },
    cartHorizontalLine: {
        marginBottom: 12,
        marginTop: 12,
        borderBottomColor: "#EDEDED",
        borderBottomWidth: 1,
    },
    cartTitle: {
        fontSize: 24,
        color: "#EDEDED"
    },

});

export default Cart;



