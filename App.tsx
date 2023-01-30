import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ChatData } from "./src/components/ChatData";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>AI ChatBot</Text>
      </View>
      <StatusBar style="light" />
      <ChatData />
    </View>
  );
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
});
