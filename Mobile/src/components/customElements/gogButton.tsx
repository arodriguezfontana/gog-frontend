import React, { ReactNode } from "react";
import { Pressable, Text, StyleSheet, GestureResponderEvent, ViewStyle, TextStyle } from "react-native";
import { Link } from "expo-router";

const backgroundColorMap = {
    green: "#7DC215",
    violet: "#6E1D72",
};

const fontColorMap = {
    black: "#212121",
    lightGrey: "#EDEDED"
};

type GogButtonProps = {
    children: ReactNode;
    onHandlePress?: (event: GestureResponderEvent) => void;
    bgColor?: keyof typeof backgroundColorMap | string;
    fontColor?: keyof typeof fontColorMap | string;
    goTo?: string;
};

export default function GogButton({
    children,
    onHandlePress,
    bgColor = "violet",
    fontColor = "black",
    goTo,
}: GogButtonProps) {
    const backgroundColor = (backgroundColorMap as Record<string, string>)[bgColor] || bgColor;
    const color = (fontColorMap as Record<string, string>)[fontColor] || fontColor;

    const NormalButton = (props: any) => (
        <Pressable
            {...props}
            onPress={onHandlePress ?? props.onPress}
            style={({ pressed }) => [
                styles.buttonContainer,
                { backgroundColor },
                pressed && styles.pressedButton,
                props.style,
            ]}
        >
            <Text style={[styles.buttonText, { color }]}>{children}</Text>
        </Pressable>
    );


    return (
        goTo ?
            <Link asChild href={goTo} >
                <NormalButton />
            </Link>
            :
            <NormalButton />
    )

}

const styles = StyleSheet.create({
    buttonContainer: {
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: "center",
        height: 56,
    } as ViewStyle,
    buttonText: {
        fontFamily: "Inter",
        fontWeight: "500",
        fontSize: 20,
        lineHeight: 28,
        letterSpacing: 0,
        textAlign: 'center',
    } as TextStyle,
    pressedButton: {
        opacity: 0.75,
        transform: [{ scale: 0.98 }],
    } as ViewStyle,
});
