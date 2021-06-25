import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export const Header:React.FC<{title: string;}> = ({title}) => {
    return (
        <View>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: '800',
        fontSize: 24,
        textAlign: 'center'
    }
})