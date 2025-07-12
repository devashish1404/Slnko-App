import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 500,
    height: 250,
    // marginBottom: 2,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    color: "#000",
  },
  loginButton: {
    backgroundColor: "#003366",
    width: "100%",
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 16,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  forgotText: {
    color: "#003366",
    fontSize: 14,
    textDecorationLine: "underline",
    marginBottom: 40,
    fontWeight:"bold"
  },
  footer: {
    alignItems: "center",
    marginTop: "45%",
  },
  poweredBy: {
    color: "#888",
    fontSize: 14,
  },
  footerLogo: {
    width: 120,
    height: 50,
    // marginTop: 4,
  },
});
