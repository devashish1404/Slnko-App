import React from "react";
import {
  StyleProp,
  TextStyle,
  ViewStyle,
  GestureResponderEvent,
} from "react-native";
import { Button } from "react-native-paper";

// Optional: Import your own styles
import { styles } from "../screens/LoginScreen/styles";

interface ButtonCompProps {
  title?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: (event: GestureResponderEvent) => void;
}

export default function ButtonComp({
  title = "Login",
  style,
  textStyle,
  onPress,
}: ButtonCompProps) {
  return (
    <Button
      mode="contained-tonal"
      onPress={onPress}
      style={[styles.loginButton, style]}
      labelStyle={textStyle}
    >
      {title}
    </Button>
  );
}
