import { Text, View, StyleSheet, TextInput } from "react-native";
import AppLayout from "../../components/appLayout";
import GogButton from "../../components/customElements/gogButton";
import { Controller } from 'react-hook-form';
import PriceDetail from "../../components/cart/priceDetail";
import usePurchase from "../../hooks/usePurchase";

const Purchase = () => {

    const { control, errors, handleSubmit, onSubmit } = usePurchase();

    return (
        <AppLayout>
            <View style={styles.checkoutContainer}>
                <View>
                    <PriceDetail showButton={false} goto={"/"}></PriceDetail>
                </View>
                <View style={styles.checkoutDataContainer}>
                    <Text style={styles.checkoutDataLabel}>CARD HOLDER NAME</Text>
                    <Controller
                        control={control}
                        name="cardName"
                        render={({ field }) => (
                            <TextInput onChangeText={field.onChange} value={field.value} style={styles.checkoutDataInput} placeholder="CARD HOLDER NAME" />
                        )}
                        rules={{
                            required: 'HOLDER NAME IS REQUIERED',
                            minLength: { message: "min length is 8 chars", value: 8 }
                        }} />{errors.cardName?.message && <Text style={styles.checkoutDataError}>{String(errors.cardName.message)}</Text>}
                </View>
                <View style={styles.checkoutDataContainer}>
                    <Text style={styles.checkoutDataLabel}>NUMBER CARD</Text>
                    <Controller
                        control={control}
                        name="cardNumber"
                        render={({ field }) => (
                            <TextInput onChangeText={field.onChange} value={field.value} style={styles.checkoutDataInput} placeholder="NUMBER CARD" />
                        )}
                        rules={{
                            required: 'The Credit Number is required',
                            maxLength: { message: "Max length number 19", value: 19 },
                            minLength: { message: "Min length number 16", value: 16 },
                        }} />{errors.cardNumber?.message && <Text style={styles.checkoutDataError}>{String(errors.cardNumber.message)}</Text>}
                </View>
                <View style={styles.checkoutDataContainer}>
                    <Text style={styles.checkoutDataLabel}>CVV</Text>
                    <Controller
                        control={control}
                        name="cardCvv"
                        render={({ field }) => (
                            <TextInput onChangeText={field.onChange} value={field.value} style={styles.checkoutDataInput} placeholder="CVV" />
                        )}
                        rules={{
                            required: 'The cvv Number is required max 3 characters',
                            maxLength: { message: "3 char max", value: 3 },
                            minLength: { message: "3 char min", value: 3 },
                        }} />{errors.cardCvv?.message && <Text style={styles.checkoutDataError}>{String(errors.cardCvv.message)}</Text>}

                </View>
                <View style={styles.checkoutDataContainer}>
                    <Text style={styles.checkoutDataLabel}>EXPIRATION DATE</Text>
                    <Controller
                        control={control}
                        name="cardExpiration"
                        render={({ field }) => (
                            <TextInput onChangeText={field.onChange} value={field.value} style={styles.checkoutDataInput} placeholder="MM/YY" />
                        )}
                        rules={{
                            required: 'The expiration date is required',
                            pattern: {
                                value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                                message: 'Format must be (MM/YY)',
                            }
                        }} />{errors.cardExpiration?.message && <Text style={styles.checkoutDataError}>{String(errors.cardExpiration.message)}</Text>}
                </View>
                <View>
                    <GogButton onHandlePress={handleSubmit(onSubmit)} bgColor='#7DC215' fontColor='DarkGrey'>
                        Buy
                    </GogButton>
                </View>
            </View>
        </AppLayout >
    )
}




const styles = StyleSheet.create({
    checkoutDataError: {
        color: "red"
    },
    checkoutDataInput: {
        backgroundColor: "white",
        marginBottom: 8
    },
    checkoutDataLabel: {
        fontWeight: "500",
        marginBottom: 4
    },

    checkoutDataContainer: {
        marginTop: 8,
    },
    checkoutContainer: {
        flex: 1,
        justifyContent: "flex-start",
        padding: 4,
        marginBottom: 4
    },
    priceDataContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        margin: 8,
        marginBottom: 16
    },
    priceData: {
        color: "#EDEDED",
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 8
    }


});

export default Purchase;