import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f8fa",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  avatarContainer: {
    alignSelf: "center",
    backgroundColor: "#fde4cf",
    padding: 10,
    borderRadius: 50,
    marginBottom: 10,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  name: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 4,
  },
  email: {
    textAlign: "center",
    fontSize: 14,
    color: "#888",
    marginBottom: 16,
  },
  infoContainer: {
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    color: "#444",
  },
  value: {
    fontSize: 14,
    color: "#111",
    fontWeight: "500",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
  badgeSuccess: {
    backgroundColor: "#22c55e",
  },
  badgeWarning: {
    backgroundColor: "#f97316",
  },
  editButton: {
    backgroundColor: "#007bff",
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 20,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize: 14,
    color: "#111",
    minWidth: 120,
    textAlign: "right",
    padding: 0,
  },
});