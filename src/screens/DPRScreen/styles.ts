import { StyleSheet } from "react-native";
import { lightTheme } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: lightTheme.colors.background,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  metaRow: {
    marginBottom: 12,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    // if `gap` complains in your RN version, remove it and use marginRight on each Text
    gap: 8,
    marginBottom: 12,
  },
});
