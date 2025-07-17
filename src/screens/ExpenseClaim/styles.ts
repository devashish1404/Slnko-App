import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { padding: 8, backgroundColor: "#fff" },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  label: { marginBottom: 4, marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  half: { width: "48%" },
  filePicker: {
    padding: 10,
    backgroundColor: "#e6e6e6",
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: { marginHorizontal: 4 },
  tabButton: {
    flexDirection: "row",
    // margin: 10,
    borderRadius: 30,
    overflow: "hidden",
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  activeTab: {
    backgroundColor: "#083c6c",
  },
  tabText: {
    fontWeight: "bold",
    color: "#000",
  },
  activeTabText: {
    color: "#fff",
  },
});
