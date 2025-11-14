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

  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },

  metaRow: {
    marginBottom: 16,
  },

  fieldGroup: {
    marginBottom: 12,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },

  readonlyInput: {
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#F9FAFB",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },

  valueText: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "500",
  },

  placeholderText: {
    fontSize: 14,
    color: "#9CA3AF",
  },

  /* ---- chips ---- */
  chipGrid: {
  marginBottom: 16,
},

chipRow: {
  flexDirection: "row",
  marginBottom: 8,
},

chip: {
  flex: 1,
  paddingVertical: 8,
  paddingHorizontal: 10,
  borderRadius: 999,
  marginRight: 8,

  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",

  backgroundColor: "#F9FAFB",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.08,
  shadowRadius: 2,
  elevation: 2,
},

chipTotal: {
  backgroundColor: "#E5E7EB",
  marginRight: 0, // last in its row
},
chipCompleted: {
  backgroundColor: "#ECFDF3",
  marginRight: 0, // last in first row
},

  chipLabel: {
    fontSize: 12,
    color: "#4B5563",
    fontWeight: "500",
  },

  chipValue: {
    fontSize: 14,
    fontWeight: "700",
  },

  chipToday: {
    backgroundColor: "#EEF2FF",
  },

  chipPending: {
    backgroundColor: "#FEF3C7",
  },

  /* ---- status dropdown ---- */
  dropdownTrigger: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#F9FAFB",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },

  dropdownArrow: {
    fontSize: 12,
    color: "#6B7280",
    marginLeft: 8,
  },

  dropdownMenu: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },

  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  dropdownItemText: {
    fontSize: 14,
    color: "#111827",
  },
});
