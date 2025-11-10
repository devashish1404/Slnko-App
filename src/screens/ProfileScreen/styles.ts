import { StyleSheet, Platform } from "react-native";

export const colors = {
  bg: "#F5F7FB",        // page background (very light grey)
  card: "#FFFFFF",      // cards
  text: "#111827",      // primary text (near-black)
  sub: "#6B7280",       // secondary text
  muted: "#9CA3AF",     // muted icons/arrows
  border: "#E5E7EB",    // soft divider/borders
  primary: "#3D7BFF",   // accent (buttons/icons)
  btn: "#3D7BFF",       // primary button fill
  btnText: "#FFFFFF",   // primary button text
};

const shadow =
  Platform.OS === "ios"
    ? {
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
      }
    : { elevation: 3 };

export const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },

  /* Top bar */
  topBar: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  topTitle: { color: colors.text, fontSize: 18, fontWeight: "700" },

  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  /* Generic card */
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow,
  },

  /* Profile block */
  profileRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  avatar: { width: 52, height: 52, borderRadius: 26, marginRight: 12 },

  name: { color: colors.text, fontSize: 16, fontWeight: "700" },
  sub: { color: colors.sub, marginTop: 2, fontSize: 13 },

  /* Primary button */
  primaryBtn: {
    alignSelf: "flex-start",
    backgroundColor: colors.btn,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 6,
  },
  primaryBtnText: { color: colors.btnText, fontWeight: "700" },

  /* Section title row */
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  /* Left icon circle for rows */
  iconBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  cardTitle: { color: colors.text, fontSize: 16, fontWeight: "700" },

  /* Secondary value text under title */
  valueText: { color: colors.sub, fontSize: 14, marginLeft: 44 },
});
