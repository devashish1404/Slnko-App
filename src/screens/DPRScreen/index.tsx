import React, { useState } from "react";
import {
  View,
  ScrollView,
  Button,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import AppInput from "../../components/AppInputs";
import { styles } from "./styles";
import { setButtonLoading } from "../../store/slices/buttonSlice";
import { lightTheme } from "../../theme";

// ---- form state type ----
interface FormState {
  todayProgress: string;
  status: "in-progress" | "idle" | "work-stopped";
  remarks: string;
}

const statusLabels: Record<FormState["status"], string> = {
  "in-progress": "In Progress",
  idle: "Idle",
  "work-stopped": "Work Stopped",
};

const DPRScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const buttonState = useAppSelector((state) => state.button);

  const [form, setForm] = useState<FormState>({
    todayProgress: "",
    status: "in-progress",
    remarks: "",
  });

  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleStatusChange = (value: FormState["status"]) => {
    setForm((prev) => ({
      ...prev,
      status: value,
      // clear today's progress when not in-progress
      todayProgress: value === "in-progress" ? prev.todayProgress : "",
    }));
  };

  const isProgressEnabled = form.status === "in-progress";

  const handleSubmit = () => {
    // if status is idle or work-stopped, remarks is mandatory
    if (
      (form.status === "idle" || form.status === "work-stopped") &&
      !form.remarks.trim()
    ) {
      Alert.alert(
        "Remarks required",
        "Please enter remarks when status is Idle or Work Stopped."
      );
      return;
    }

    // validate today's progress when in-progress
    if (form.status === "in-progress" && !form.todayProgress.trim()) {
      Alert.alert(
        "Enter today's progress",
        "Please fill today's progress value."
      );
      return;
    }

    dispatch(setButtonLoading(true));

    // TODO: call your API here
    setTimeout(() => {
      dispatch(setButtonLoading(false));
      Alert.alert("Progress Submitted!");
    }, 2000);
  };

  const handleProjectPress = () => {
    Alert.alert("Project pressed", "Open project selection here");
  };

  const handleActivityPress = () => {
    Alert.alert("Activity pressed", "Open activity selection here");
  };

  const statusOptions: { value: FormState["status"]; label: string }[] = [
    { value: "in-progress", label: "In Progress" },
    { value: "idle", label: "Idle" },
    { value: "work-stopped", label: "Work Stopped" },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Project & Activity */}
        <View style={styles.metaRow}>
          <TouchableOpacity
            style={styles.fieldGroup}
            activeOpacity={0.7}
            onPress={handleProjectPress}
          >
            <Text style={styles.label}>Project</Text>
            <View style={styles.readonlyInput}>
              <Text style={styles.valueText}>UPNEDA/Ramgopal/1800/628</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.fieldGroup}
            activeOpacity={0.7}
            onPress={handleActivityPress}
          >
            <Text style={styles.label}>Activity</Text>
            <View style={styles.readonlyInput}>
              <Text style={styles.valueText}>Site Survey</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Chips row */}
<View style={styles.chipGrid}>
  {/* Row 1: Today + Completed */}
  <View style={styles.chipRow}>
    <View style={[styles.chip, styles.chipToday]}>
      <Text style={styles.chipLabel}>Today</Text>
      <Text style={styles.chipValue}>0</Text>
    </View>

    <View style={[styles.chip, styles.chipCompleted]}>
      <Text style={styles.chipLabel}>Completed</Text>
      <Text style={styles.chipValue}>0</Text>
    </View>
  </View>

  {/* Row 2: Pending + Total */}
  <View style={styles.chipRow}>
    <View style={[styles.chip, styles.chipPending]}>
      <Text style={styles.chipLabel}>Pending</Text>
      <Text style={styles.chipValue}>2</Text>
    </View>

    <View style={[styles.chip, styles.chipTotal]}>
      <Text style={styles.chipLabel}>Total</Text>
      <Text style={styles.chipValue}>2</Text>
    </View>
  </View>
</View>


        {/* Today's Progress */}
        <AppInput
          form="logProgress"
          field="todayProgress"
          labelText="Today's Progress (number)"
          value={form.todayProgress}
          onChangeText={(value) => handleChange("todayProgress", value)}
          helperText={
            isProgressEnabled
              ? "Max today: 2 number"
              : "Disabled when not In Progress"
          }
          editable={isProgressEnabled} // make sure AppInput supports this
        />

        {/* Status dropdown (AFTER today's progress) */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Status</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.dropdownTrigger}
            onPress={() => setStatusDropdownOpen((prev) => !prev)}
          >
            <Text style={styles.valueText}>
              {statusLabels[form.status]}
            </Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>

          {statusDropdownOpen && (
            <View style={styles.dropdownMenu}>
              {statusOptions.map((opt) => (
                <TouchableOpacity
                  key={opt.value}
                  style={styles.dropdownItem}
                  onPress={() => {
                    handleStatusChange(opt.value);
                    setStatusDropdownOpen(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{opt.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Remarks */}
        <AppInput
          form="logProgress"
          field="remarks"
          labelText="Remarks (optional)"
          value={form.remarks}
          onChangeText={(value) => handleChange("remarks", value)}
          
        />

        {/* Submit button */}
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

export default DPRScreen;
