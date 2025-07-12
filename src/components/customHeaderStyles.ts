import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#003366",
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profileCircle: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  profileInitial: {
    color: "#003366",
    fontWeight: "bold",
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  logo: {
    width: 120,
    height: 50,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  grid: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    width: (width - 60) / 2,
    aspectRatio: 1,
    backgroundColor: "#f0f4f7",
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  cardText: {
    marginTop: 10,
    fontSize: 14,
    color: "#003366",
    textAlign: "center",
    fontWeight: "500",
  },
  footer: {
    alignItems: "center",
    marginTop: "auto",
    paddingBottom: 10,
  },
  footerText: {
    fontSize: 12,
    color: "#888",
  },
  footerLogo: {
    width: 80,
    height: 30,
    marginTop: 4,
  },
});
