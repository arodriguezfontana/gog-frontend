import { Text, View, StyleSheet } from "react-native";
import GogButton from "../customElements/gogButton";
import { useAuth } from "../../context/authContext";
import { useEffect, useState } from "react";
import { getTotalFee, getTotalPriceOnCart } from "../../services/gamesService";

type PriceDetailProps = {
    children?: React.ReactNode;
    showButton?: boolean;
    goto: string;
}

const PriceDetail: React.FC<PriceDetailProps> = ({ children, showButton, goto }) => {

    const { token } = useAuth();

    const [total, setTotal] = useState(0.0)
    const [fee, setFee] = useState(0.0)

    const fetchTotals = async () => {

        const total = await getTotalPriceOnCart(token);
        setTotal(total);

        const feeTotal = await getTotalFee(token);
        setFee(parseFloat(feeTotal));
    };


    useEffect(() => {

        fetchTotals();

    }, [token])

    return (
        <View style={styles.priceContainer}>
            <View style={styles.priceDataContainer}>
                <View>
                    <Text style={styles.priceData}>
                        Fees 1%
                    </Text>
                    <Text style={styles.priceData}>
                        Total
                    </Text>
                </View>
                <View>
                    <Text style={styles.priceData}>
                        $ {fee}
                    </Text>
                    <Text style={styles.priceData}>
                        $ {total}
                    </Text>
                </View>
            </View>
            {showButton &&
                <View style={styles.buttonContainer}>
                    <GogButton goTo={goto} bgColor='#7DC215' fontColor='DarkGrey'>
                        {children}
                    </GogButton>
                </View>}
        </View>
    )

}

const styles = StyleSheet.create({
    priceContainer: {
        margin: 2,
        marginTop: 16,
        padding: 8,
        backgroundColor: "#898989",
        borderRadius: 8
    }, priceDataContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        margin: 8
    },
    priceData: {
        color: "#EDEDED",
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 8
    },
    buttonContainer: {
        margin: 4
    },
})

export default PriceDetail;