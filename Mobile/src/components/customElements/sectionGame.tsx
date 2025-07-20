import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface SectionProperties {
    children: React.ReactNode
    title: string
}

const Section: React.FC<SectionProperties> = ({ children, title }) => {

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>{title}</Text>
                {children}
            </View>
        </View>
    );
};

export default Section;

const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10
    }
});