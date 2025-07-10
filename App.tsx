import { StyleSheet, Text, useColorScheme, View } from "react-native";

function App() {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <View style={styles.container}>
      <Text style={isDarkMode ? styles.whiteText : styles.darkText}>
        WELCOME TO SLNKO ENERGY PVT LTD
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  whiteText: {
    color: "#FFFFFF",
  },
  darkText: {
    color: "#000000",
  },
});

export default App;
