import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

type Item = {
    type: string,
    text: string
}
export function ChatItem({ item }: { item: Item }) {
    return (
        <View style={styles.listItem} >
            <Text style={[styles.textItem, { color: item.type === 'user' ? '#6986fe' : '#189ec7' }]}>
                {item.type === "user" ? 'You' : null}
            </Text>
            {item.type === 'user' ? null : <Image style={{ width: 30, height: 50 }} source={require('../../../assets/images/bot-logo.png')} />
            }
            <View style={item.type === "user" ? styles.textViewUser : styles.textViewBot}>
                <Text style={styles.bot}>
                    {item.text}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        padding: 20,
        marginRight: 10,
        marginLeft: 10,
    },
    textItem: {
        fontWeight: 'bold',
    },
    bot: {
        fontSize: 16,
        color: "#fff",
        padding: 20,
    },
    textViewUser: {
        backgroundColor: '#6986fe',
        borderTopEndRadius: 15,
        borderBottomEndRadius: 15,
        borderBottomLeftRadius: 15,
        marginRight: 15,
        marginLeft: 15,
    },
    textViewBot: {
        backgroundColor: '#303346',
        borderTopEndRadius: 15,
        borderBottomEndRadius: 15,
        borderBottomLeftRadius: 15,
        marginRight: 15,
        marginLeft: 15,
    }

});
