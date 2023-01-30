import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppHeader from "./src/components/AppHeader/AppHeader";
import { ChatData } from "./src/components/ChatData";

export default function App() {
  return (
    <View style={styles.container}>
      <AppHeader/>
      <StatusBar style="light" />
      <ChatData />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d1f2b",
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
