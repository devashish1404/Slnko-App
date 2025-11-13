import {
  MD3LightTheme as DefaultTheme,
  type MD3Theme,
} from "react-native-paper";
import { COLORS } from "./color";

export const lightTheme: MD3Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary,
    primaryContainer: COLORS.primarySoft,
    secondary: COLORS.secondary,
    secondaryContainer: COLORS.secondaryLight,

    background: COLORS.background,
    surface: COLORS.surface,
    surfaceVariant: COLORS.surfaceElevated,

    outline: COLORS.borderSubtle,

    error: COLORS.error,
    errorContainer: COLORS.errorSoft,

    onPrimary: COLORS.textOnPrimary,
    onSecondary: COLORS.textOnSecondary,
    onBackground: COLORS.textPrimary,
    onSurface: COLORS.textPrimary,
    onError: COLORS.textOnPrimary,
  },
};
