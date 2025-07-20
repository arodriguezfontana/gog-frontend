import { View } from 'react-native'
import React from 'react'
import H2 from './h2'

type SectionProps = {
    title: string,
    children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
    return (
        <View>
            <H2>{title}</H2>
            {children}
        </View>
    )
}

export default Section