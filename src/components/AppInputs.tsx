import React from "react";
import { TextInput, Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";

interface AppInputProps {
  form: string;
  field: string;
  labelText: string;
  value: string;
  onChangeText: (value: string) => void;
  helperText?: string;
  editable?: boolean;
}

const AppInput: React.FC<AppInputProps> = ({
  form,
  field,
  labelText,
  helperText,
  value,
  onChangeText,
}) => {
  return (
    <View style={styles.container}>
      {labelText ? <Text style={styles.label}>{labelText}</Text> : null}
      <TextInput
        mode="outlined"
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
      {helperText ? <Text style={styles.helper}>{helperText}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
    color: "#4b5563",
  },
  input: {
    backgroundColor: "white",
  },
  helper: {
    fontSize: 11,
    marginTop: 3,
    color: "#6b7280",
  },
});

export default AppInput;
