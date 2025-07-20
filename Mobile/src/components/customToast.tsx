import React from 'react'
import { View, Text } from 'react-native'
import Toast, {
    BaseToast,
    ErrorToast,
    ToastConfig,
} from 'react-native-toast-message'
import type { BaseToastProps } from 'react-native-toast-message'
import { JSX } from 'react'

const toastConfig: ToastConfig = {
    success: (props: BaseToastProps) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: 'green', zIndex: 99 }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 15,
                fontWeight: '400',
            }}
        />
    ),
    error: (props: BaseToastProps) => (
        <ErrorToast
            {...props}
            style={{ zIndex: 99999, borderLeftColor: 'red' }}
            text1Style={{
                fontSize: 17,
            }}
            text2Style={{
                fontSize: 15,
            }}
        />
    ),
    tomatoToast: ({ text1, props }) => (
        <View
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 60,
                backgroundColor: 'tomato',
                padding: 10,
                zIndex: 99999,
            }}
        >
            <Text style={{ color: 'white', fontSize: 16 }}>{text1}</Text>
            {props?.uuid && <Text style={{ color: 'white' }}>{props.uuid}</Text>}
        </View>
    ),

}

export function CustomToast(): JSX.Element {
    return <Toast config={toastConfig} />
}
