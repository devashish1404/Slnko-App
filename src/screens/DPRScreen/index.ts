import React, { useState } from "react";
import { View, ScrollView, Button, Text, Alert } from "react-native";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import AppInput from "../../components/AppInputs";
import { styles } from "../DPRScreen/styles";
import { setButtonLoading } from "../../store/slices/buttonSlice";
import { lightTheme } from "../../theme";

// ---- form state type ----
interface FormState {
  todayProgress: string;
  status: "in-progress" | "completed" | "pending";
  remarks: string;
}

const LogProgressScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const buttonState = useAppSelector((state) => state.button);

  const [form, setForm] = useState<FormState>({
    todayProgress: "",
    status: "in-progress",
    remarks: "",
  });

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    dispatch(setButtonLoading(true));

    // TODO: call your API here
    setTimeout(() => {
      dispatch(setButtonLoading(false));
      Alert.alert("Progress Submitted!");
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Log Today&apos;s Progress</Text>

        <View style={styles.metaRow}>
          <Text>Project: UPNEDA/Ramgopal/1800/628</Text>
          <Text>Activity: Site Survey</Text>
        </View>

        <View style={styles.chipRow}>
          <Text>Today: 0</Text>
          <Text>Completed: 0</Text>
          <Text>Pending: 2</Text>
          <Text>Total: 2</Text>
        </View>

        <AppInput
          form="logProgress"
          field="todayProgress"
          labelText="Today&apos;s Progress (number)"
          value={form.todayProgress}
          onChangeText={(value) => handleChange("todayProgress", value)}
          helperText="Max today: 2 number"
        />

        <AppInput
          form="logProgress"
          field="remarks"
          labelText="Remarks (optional)"
          value={form.remarks}
          onChangeText={(value) => handleChange("remarks", value)}
        />

        <Button
          title="Submit Progress"
          onPress={handleSubmit}
          disabled={buttonState.disabled}
          color={lightTheme.colors.primary}
        />
      </ScrollView>
    </View>
  );
};

export default LogProgressScreen;
