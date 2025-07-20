import { View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { StyleSheet } from 'react-native'

type AppLayoutProps = {
    children: React.ReactNode;
    hasTopSpace?: boolean;
    hasSideSpace?: boolean;

}

const AppLayout: React.FC<AppLayoutProps> = ({ children, hasTopSpace = true, hasSideSpace = true }) => {
    const insets = useSafeAreaInsets()
    return (
        <View style={[styles.container, {
            paddingTop: hasTopSpace ? insets.top + 12 : 0,
            paddingLeft: hasSideSpace ? insets.left + 12 : 0,
            paddingRight: hasSideSpace ? insets.right + 12 : 0,


        }]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: "#D9D9D9",
    },
})

export default AppLayout

