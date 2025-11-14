
import React from "react";
import {
  StyleProp,
  TextStyle,
  ViewStyle,
  GestureResponderEvent,
} from "react-native";
import { Button } from "react-native-paper";
import { styles } from "../screens/LoginScreen/styles";
import { useAppSelector } from "../store/hooks";

interface ButtonCompProps {
  title?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: (event: GestureResponderEvent) => void;
}

export default function ButtonComp({
  title,
  style,
  textStyle,
  onPress,
}: ButtonCompProps) {
  const { label, loading, disabled } = useAppSelector(
    (state) => state.button
  );

  const finalTitle = title ?? label;

  return (
    <Button
      mode="contained-tonal"
      onPress={onPress}
      style={[styles.loginButton, style]}
      // labelStyle={textStyle}
      loading={loading}
      disabled={disabled || loading}
    >
      {finalTitle}
    </Button>
  );
}
