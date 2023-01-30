import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";

export default function AppHeader() {
    return (
        <View style={styles.appHeader}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>AI ChatBot</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#202123",
    },
    textContainer: {
        alignSelf: "center",
        marginTop: 100,
    },
    title: {
        color: "#fff",
        fontSize: 25,
    },
    appHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        alignSelf: "center",
        marginTop: 80,

    }
});
