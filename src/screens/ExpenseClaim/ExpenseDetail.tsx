import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Button, Menu, Provider, Switch } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DocumentPicker from "react-native-document-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "./styles";
import { useTab } from "../../store/tabContext";

const ExpenseDetail: React.FC = () => {
  const navigation = useNavigation();
  const [projectCode, setProjectCode] = useState<string>("");
  const [projectMenuVisible, setProjectMenuVisible] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [showBillDatePicker, setShowBillDatePicker] = useState(false);
  const [isBillAvailable, setIsBillAvailable] = useState(false);

  const [expenseCategory, setExpenseCategory] = useState("");
  const [billNumber, setBillNumber] = useState("");
  const [billDate, setBillDate] = useState<Date | undefined>();
  const [billAmount, setBillAmount] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const [fileName, setFileName] = useState<string>("");
  const { activeTab, setActiveTab } = useTab();
  const [projectName, setProjectName] = useState("");
  const [state, setState] = useState("");

  type Expense = {
    expenseCategory: string;
    billDate: string;
    isBillAvailable: boolean;
    billNumber: string;
    billAmount: string;
    fileName: string;
    remarks: string;
  };

  type Itinerary = {
    state: string;
    projectName: string;
    startDate: Date | undefined;
    endDate: Date | undefined;
    expenses: Expense[];
  };

  const [itineraries, setItineraries] = useState<Itinerary[]>([
    {
      state: "",
      projectName: "",
      startDate: undefined,
      endDate: undefined,
      expenses: [
        {
          expenseCategory: "",
          billDate: "",
          isBillAvailable: false,
          billNumber: "",
          billAmount: "",
          fileName: "",
          remarks: "",
        },
      ],
    },
  ]);
  const [showStartPickerIndex, setShowStartPickerIndex] = useState<
    number | null
  >(null);
  const [showEndPickerIndex, setShowEndPickerIndex] = useState<number | null>(
    null
  );

  const handleAddItinerary = () => {
    setItineraries([
      ...itineraries,
      {
        state: "",
        projectName: "",
        startDate: undefined,
        endDate: undefined,
        expenses: [
          {
            expenseCategory: "",
            billDate: "",
            isBillAvailable: false,
            billNumber: "",
            billAmount: "",
            fileName: "",
            remarks: "",
          },
        ],
      },
    ]);
  };

  const handleAddExpense = (itineraryIndex: number) => {
    const updated = [...itineraries];
    updated[itineraryIndex].expenses.push({
      expenseCategory: "",
      billDate: "",
      isBillAvailable: false,
      billNumber: "",
      billAmount: "",
      fileName: "",
      remarks: "",
    });
    setItineraries(updated);
  };

  const handleFilePick = async (
    itineraryIndex: number,
    expenseIndex: number
  ) => {
    try {
      const result = await DocumentPicker.pickSingle();
      const updated = [...itineraries];
      updated[itineraryIndex].expenses[expenseIndex].fileName =
        result.name ?? "";
      setItineraries(updated);
    } catch (err) {
      console.log("File pick cancelled");
    }
  };

  const handleRemoveItinerary = (index: number) => {
    const updated = [...itineraries];
    updated.splice(index, 1);
    setItineraries(updated);
  };

  const handleRemoveExpense = (
    itineraryIndex: number,
    expenseIndex: number
  ) => {
    const updated = [...itineraries];
    updated[itineraryIndex].expenses.splice(expenseIndex, 1);
    setItineraries(updated);
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
            onPress={() => {
              setActiveTab("status");
              // navigation.navigate("ExpenseApprove" as never);
            }}
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

        {/*---------------Project code View-------------*/}

        {/* Itineraries */}
        {itineraries.map((itinerary, itineraryIndex) => (
          <View key={itineraryIndex} style={styles.itemAdd}>
            <TouchableOpacity
              onPress={() => handleRemoveItinerary(itineraryIndex)}
              style={styles.deleteIcon}
            >
              <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
            {/* Project Section */}
            <Text style={styles.label}>Project Code*</Text>
            <TextInput
              style={styles.input}
              placeholder="Select State"
              value={itinerary.state}
              onChangeText={(val) => {
                const updated = [...itineraries];
                updated[itineraryIndex].state = val;
                setItineraries(updated);
              }}
            />

            <Text style={styles.label}>Project Name*</Text>
            <TextInput
              style={styles.input}
              placeholder="Select Project Name"
              value={itinerary.projectName}
              onChangeText={(val) => {
                const updated = [...itineraries];
                updated[itineraryIndex].projectName = val;
                setItineraries(updated);
              }}
            />

            <View style={styles.row}>
              <View style={styles.half}>
                <Text style={styles.label}>Start Date</Text>
                <TouchableOpacity
                  onPress={() => setShowStartPickerIndex(itineraryIndex)}
                  style={styles.input}
                >
                  <Text>
                    {itinerary.startDate
                      ? new Date(itinerary.startDate).toDateString()
                      : "Select Date"}
                  </Text>
                </TouchableOpacity>
                {showStartPickerIndex === itineraryIndex && (
                  <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="default"
                    onChange={(e, date) => {
                      const updated = [...itineraries];
                      updated[itineraryIndex].startDate = date;
                      setItineraries(updated);
                      setShowStartPickerIndex(null);
                    }}
                  />
                )}
              </View>

              <View style={styles.half}>
                <Text style={styles.label}>End Date</Text>
                <TouchableOpacity
                  onPress={() => setShowEndPickerIndex(itineraryIndex)}
                  style={styles.input}
                >
                  <Text>
                    {itinerary.endDate
                      ? new Date(itinerary.endDate).toDateString()
                      : "Select Date"}
                  </Text>
                </TouchableOpacity>
                {showEndPickerIndex === itineraryIndex && (
                  <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="default"
                    onChange={(e, date) => {
                      const updated = [...itineraries];
                      updated[itineraryIndex].endDate = date;
                      setItineraries(updated);
                      setShowEndPickerIndex(null);
                    }}
                  />
                )}
              </View>
            </View>

            {/* Add Expense Button */}

            <TouchableOpacity
              onPress={() => handleAddExpense(itineraryIndex)}
              style={styles.addButton}
            >
              <Text style={styles.addtextButton}>Add More Expense</Text>
            </TouchableOpacity>

            {/* Expenses */}
            {itinerary.expenses.map((expense, expenseIndex) => (
              <View key={expenseIndex} style={{ marginTop: 20 }}>
                {itinerary.expenses.length > 1 && (
                  <TouchableOpacity
                    onPress={() =>
                      handleRemoveExpense(itineraryIndex, expenseIndex)
                    }
                    style={styles.deleteIcon}
                  >
                    <MaterialIcons name="delete" size={20} color="blue" />
                  </TouchableOpacity>
                )}
                <Text style={styles.label}>Expense Category*</Text>
                <TextInput
                  style={styles.input}
                  value={expense.expenseCategory}
                  onChangeText={(val) => {
                    const updated = [...itineraries];
                    updated[itineraryIndex].expenses[
                      expenseIndex
                    ].expenseCategory = val;
                    setItineraries(updated);
                  }}
                  placeholder="Select Category"
                />

                <Text style={styles.label}>Bill Date*</Text>
                <TextInput
                  style={styles.input}
                  value={expense.billDate}
                  onChangeText={(val) => {
                    const updated = [...itineraries];
                    updated[itineraryIndex].expenses[expenseIndex].billDate =
                      val;
                    setItineraries(updated);
                  }}
                  placeholder="Enter Bill Date"
                />

                <View style={styles.row}>
                  <View style={styles.switch}>
                    <Text style={styles.label}>Is Bill Available*</Text>
                    <Switch
                      value={expense.isBillAvailable}
                      onValueChange={(val) => {
                        const updated = [...itineraries];
                        updated[itineraryIndex].expenses[
                          expenseIndex
                        ].isBillAvailable = val;
                        setItineraries(updated);
                      }}
                      thumbColor={expense.isBillAvailable ? "#083c6c" : "#ccc"}
                      trackColor={{ false: "#ccc", true: "#4d8bcf" }}
                    />
                  </View>

                  {expense.isBillAvailable && (
                    <View>
                      <Text style={styles.label}>Bill Number*</Text>
                      <TextInput
                        style={styles.inputBill}
                        value={expense.billNumber}
                        onChangeText={(val) => {
                          const updated = [...itineraries];
                          updated[itineraryIndex].expenses[
                            expenseIndex
                          ].billNumber = val;
                          setItineraries(updated);
                        }}
                        placeholder="Enter Bill Number"
                      />
                    </View>
                  )}
                </View>

                <Text style={styles.label}>Bill Amount*</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={expense.billAmount}
                  onChangeText={(val) => {
                    const updated = [...itineraries];
                    updated[itineraryIndex].expenses[expenseIndex].billAmount =
                      val;
                    setItineraries(updated);
                  }}
                  placeholder="Enter Bill Amount"
                />

                <Text style={styles.label}>Upload File</Text>
                <TouchableOpacity
                  onPress={() => handleFilePick(itineraryIndex, expenseIndex)}
                  style={styles.filePicker}
                >
                  <Text>{expense.fileName || "Choose File"}</Text>
                </TouchableOpacity>

                <Text style={styles.label}>Remarks</Text>
                <TextInput
                  style={[styles.input, styles.textarea]}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  value={expense.remarks}
                  onChangeText={(val) => {
                    const updated = [...itineraries];
                    updated[itineraryIndex].expenses[expenseIndex].remarks =
                      val;
                    setItineraries(updated);
                  }}
                  placeholder="Enter Remarks"
                />
              </View>
            ))}
          </View>
        ))}

        <TouchableOpacity onPress={handleAddItinerary} style={styles.addButton}>
          <Text style={styles.addtextButton}>Add More Itinerary Detail</Text>
        </TouchableOpacity>

        <View>
          <TextInput
            style={styles.input}
            placeholder="Total Requested Amount"
            value={projectName}
            onChangeText={setProjectName}
          />
        </View>

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
