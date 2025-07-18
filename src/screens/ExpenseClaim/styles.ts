import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: "#fff",
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  row: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  half: {
    flex: 1,
    marginRight: 8,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  inputBill: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  switch:{
    flexDirection:'row'
  },
  filePicker: {
    padding: 10,
    backgroundColor: "#e6e6e6",
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    marginHorizontal: 4,
  },
  tabButton: {
    flexDirection: "row",
    borderRadius: 30,
    overflow: "hidden",
    marginBottom: 12,
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
  addButton: {
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: 12,
  },
  addtextButton: {
    fontWeight: "bold",
    color: "#083c6c",
  },
  itemAdd: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f8f8f8",
    // marginBottom: 16,
  },
   textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  deleteIcon: {
  alignSelf: 'flex-end',
  marginVertical: 10,
}
});
