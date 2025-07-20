import { Stack } from "expo-router";
import { AuthProvider } from "../context/authContext";
import { SafeAreaProvider } from "react-native-safe-area-context"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native";
import { CustomToast } from "../components/customToast";
import { CartProvider } from "../context/cartContext";

export default function RootLayout() {
    const insets = useSafeAreaInsets();

    const styles = StyleSheet.create({
        bottom: { flex: 1, paddingBottom: insets.bottom, backgroundColor: '#fff' }
    });

    return (
        <>
            <SafeAreaProvider>
                <CustomToast />
                <CartProvider>
                    <AuthProvider>
                        <View style={styles.bottom}>
                            <Stack screenOptions={{ headerShown: false }}>
                                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                                <Stack.Screen name="login" />
                                <Stack.Screen name="_not-found" options={{ title: "Oops! This screen doesn't exist." }} />
                            </Stack>
                        </View>
                    </AuthProvider>
                </CartProvider>
            </SafeAreaProvider>
        </>
    );
}