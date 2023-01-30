import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function ChatItem({item}:{item:any}) {
    return (
        <View style={styles.listItem} >
            <Text style={[styles.textItem, { color: item.type === 'user' ? 'green' : 'red' }]}>
                {item.type === "user" ? 'You' : 'Bot'}
            </Text>
            <Text style={styles.bot}>
                {item.text}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        padding: 10
    },
    textItem: {
        fontWeight: 'bold',
    },
    bot: {
        fontSize: 16,
        color: "#fff",
    },

});
