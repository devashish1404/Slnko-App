import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Button, Menu, Provider } from "react-native-paper";
import DocumentPicker from "react-native-document-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "./styles";
import { useTab } from "../../store/tabContext";

const ExpenseDetail: React.FC = () => {
  const [projectCode, setProjectCode] = useState<string>("");
  const [projectMenuVisible, setProjectMenuVisible] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const [expenseCategory, setExpenseCategory] = useState("");
  const [billNumber, setBillNumber] = useState("");
  const [billDate, setBillDate] = useState<Date | undefined>();
  const [billAmount, setBillAmount] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const [fileName, setFileName] = useState<string>("");
  const { activeTab, setActiveTab } = useTab();

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.pickSingle();
      // setFileName(result.name);
    } catch (err) {
      console.log("File pick cancelled");
    }
  };

  return (
    <Provider>
      <ScrollView style={styles.container}>
        <View style={styles.tabButton}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "request" && styles.activeTab]}
            onPress={() => setActiveTab("request")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "request" && styles.activeTabText,
              ]}
            >
              Expense Request
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "status" && styles.activeTab]}
            onPress={() => setActiveTab("status")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "status" && styles.activeTabText,
              ]}
            >
              Expense Status
            </Text>
          </TouchableOpacity>
        </View>

        {/* Project Code Dropdown */}

        <View >
          <Text style={styles.label}>Project Code*</Text>
        <Menu
          visible={projectMenuVisible}
          onDismiss={() => setProjectMenuVisible(false)}
          anchor={
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setProjectMenuVisible(true)}
            >
              <Text>{projectCode || "Select Project Code"}</Text>
            </TouchableOpacity>
          }
        >
          <Menu.Item onPress={() => setProjectCode("PRJ001")} title="PRJ001" />
          <Menu.Item onPress={() => setProjectCode("PRJ002")} title="PRJ002" />
        </Menu>
        </View>
      
      <View>
        <Text>Add More Itinerary Detail</Text>
      </View>

        {/* Date Pickers */}
        <View style={styles.row}>
          <View style={styles.half}>
            <Text style={styles.label}>Start Date</Text>
            <TouchableOpacity
              onPress={() => setShowStartPicker(true)}
              style={styles.input}
            >
              <Text>
                {startDate ? startDate.toDateString() : "Select Date"}
              </Text>
            </TouchableOpacity>
            {showStartPicker && (
              <DateTimePicker
                value={startDate || new Date()}
                mode="date"
                display="default"
                onChange={(e, date) => {
                  setShowStartPicker(false);
                  if (date) setStartDate(date);
                }}
              />
            )}
          </View>

          <View style={styles.half}>
            <Text style={styles.label}>End Date</Text>
            <TouchableOpacity
              onPress={() => setShowEndPicker(true)}
              style={styles.input}
            >
              <Text>{endDate ? endDate.toDateString() : "Select Date"}</Text>
            </TouchableOpacity>
            {showEndPicker && (
              <DateTimePicker
                value={endDate || new Date()}
                mode="date"
                display="default"
                onChange={(e, date) => {
                  setShowEndPicker(false);
                  if (date) setEndDate(date);
                }}
              />
            )}
          </View>
        </View>

        {/* Expense Category */}
        <Text style={styles.label}>Expense Category*</Text>
        <TextInput
          style={styles.input}
          value={expenseCategory}
          onChangeText={setExpenseCategory}
          placeholder="Enter Category"
        />

        {/* Bill Details */}
        <Text style={styles.label}>Bill Number*</Text>
        <TextInput
          style={styles.input}
          value={billNumber}
          onChangeText={setBillNumber}
        />

        <Text style={styles.label}>Bill Amount*</Text>
        <TextInput
          style={styles.input}
          value={billAmount}
          onChangeText={setBillAmount}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Total Amount*</Text>
        <TextInput
          style={styles.input}
          value={totalAmount}
          onChangeText={setTotalAmount}
          keyboardType="numeric"
        />

        {/* File Upload */}
        <Text style={styles.label}>Upload File</Text>
        <TouchableOpacity onPress={handleFilePick} style={styles.filePicker}>
          <Text>{fileName || "Choose File"}</Text>
        </TouchableOpacity>

        {/* Remarks */}
        <Text style={styles.label}>Remarks</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          multiline
          value={remarks}
          onChangeText={setRemarks}
        />

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <Button mode="contained" onPress={() => {}} style={styles.button}>
            Save
          </Button>
          <Button mode="outlined" onPress={() => {}} style={styles.button}>
            Draft
          </Button>
          <Button mode="text" onPress={() => {}} style={styles.button}>
            Cancel
          </Button>
        </View>
      </ScrollView>
    </Provider>
  );
};




export default ExpenseDetail;

