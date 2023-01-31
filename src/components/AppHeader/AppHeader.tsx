import { StyleSheet, Text, View, Image } from "react-native";

export default function AppHeader() {
    return (
        <View style={styles.appHeader}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Let's Chat!</Text>
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
        marginTop: 80,
    },
    title: {
        color: "#fff",
        fontSize: 25,
        letterSpacing:0.8,
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
