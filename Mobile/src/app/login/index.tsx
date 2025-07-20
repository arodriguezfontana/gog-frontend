// components
import { StyleSheet, Text, View, TextInput, ViewStyle, TextStyle } from 'react-native';
import GogButton from '../../components/customElements/gogButton';
import { CustomToast } from '../../components/customToast';
import { useLoginForm } from '../../hooks/useLoginForm';

export default function LoginPage() {
    const { changeForm, sendForm } = useLoginForm()

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <CustomToast />
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Sign in</Text>

                    <View>
                        <Text style={styles.inputTitle}>SIGN IN WITH EMAIL</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => changeForm("email", text)}
                            autoCapitalize="none"
                            autoComplete="email"
                            keyboardType="email-address"
                            placeholder="Email"
                            textContentType="emailAddress"
                        />
                    </View>

                    <View>
                        <Text style={styles.inputTitle}>PASSWORD</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => changeForm("password", text)}
                            secureTextEntry
                            autoCapitalize="none"
                            placeholder="Password"
                            textContentType="password"
                        />
                    </View>

                    <GogButton fontColor="lightGrey" onHandlePress={(e) => sendForm(e)}>
                        Sign in
                    </GogButton>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create<{
    container: ViewStyle;
    formContainer: ViewStyle;
    input: TextStyle;
    inputTitle: TextStyle;
    title: TextStyle;
}>({
    container: {
        flex: 1,
        backgroundColor: '#D9D9D9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        padding: 16,
        width: "100%",
        fontFamily: "Inter",
        fontWeight: "500",
        fontSize: 20,
        lineHeight: 28,
        letterSpacing: 0,
        backgroundColor: "#EDEDED",
        borderRadius: 8,
        marginTop: 4,
        shadowColor: "#000",
        shadowOffset: { width: 6, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 6,
    },

    formContainer: {
        alignContent: "center",
        width: "100%",
        maxWidth: 329,
        gap: 24,
    },
    inputTitle: {
        fontFamily: "Inter",
        fontWeight: "500",
        fontSize: 20,
        lineHeight: 28,
        letterSpacing: 0,
    },
    title: {
        width: "100%",
        textAlign: "center",
        fontFamily: "Inter",
        fontWeight: "700",
        fontSize: 32,
        lineHeight: 28,
        letterSpacing: 0,
        height: 32
    }
});

